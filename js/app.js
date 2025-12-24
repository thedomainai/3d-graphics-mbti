/**
 * 16 Personalities 3D Visualization
 * Main Application
 */

import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@21/dist/tween.esm.js';

import { CONFIG, getIconPath } from './config.js';
import { PERSONALITIES, COMPATIBILITY_DATA, getCompatibility } from './data.js';

// Application State
let camera, scene, renderer, controls;
let selectedElement = null;
let hoveredElement = null;
let showLinesGlobal = false;
let linesSvg = null;
let animationTime = 0;

const objects = [];
const targets = { table: [], sphere: [], helix: [], grid: [] };
const typeToObject = {};

// Initialize application
init();
animate();

function init() {
    linesSvg = document.getElementById('lines-svg');
    
    // Camera setup with adjusted distance
    camera = new THREE.PerspectiveCamera(
        CONFIG.camera.fov,
        window.innerWidth / window.innerHeight,
        CONFIG.camera.near,
        CONFIG.camera.far
    );
    camera.position.z = CONFIG.camera.initialZ;

    scene = new THREE.Scene();

    // Create personality cards
    for (let i = 0; i < PERSONALITIES.length; i++) {
        const [code, name, group, emoji, col, row] = PERSONALITIES[i];

        const element = document.createElement('div');
        element.className = `element ${group}`;
        element.dataset.type = code;
        element.dataset.name = name;
        element.dataset.icon = emoji;

        // Icon container
        const iconDiv = document.createElement('div');
        iconDiv.className = 'icon';
        
        // Use character image if available
        const iconPath = getIconPath(code);
        const img = document.createElement('img');
        img.src = iconPath;
        img.className = 'icon-img';
        img.onerror = () => {
            // Fallback to emoji if image fails to load
            iconDiv.textContent = emoji;
            img.remove();
        };
        iconDiv.appendChild(img);
        element.appendChild(iconDiv);

        // Type ID
        const typeId = document.createElement('div');
        typeId.className = 'type-id';
        typeId.textContent = code;
        element.appendChild(typeId);

        // Type name
        const typeName = document.createElement('div');
        typeName.className = 'type-name';
        typeName.textContent = name;
        element.appendChild(typeName);

        // Event listeners
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            showCompatibilityPanel(code, name, emoji, element);
        });

        element.addEventListener('mouseenter', () => {
            hoveredElement = element;
            if (!showLinesGlobal) drawCompatibilityLines(code);
        });

        element.addEventListener('mouseleave', () => {
            hoveredElement = null;
            if (!showLinesGlobal) clearLines();
        });

        // Create 3D object with random initial position
        const objectCSS = new CSS3DObject(element);
        objectCSS.position.x = Math.random() * CONFIG.randomRange - CONFIG.randomRange / 2;
        objectCSS.position.y = Math.random() * CONFIG.randomRange - CONFIG.randomRange / 2;
        objectCSS.position.z = Math.random() * CONFIG.randomRange - CONFIG.randomRange / 2;
        scene.add(objectCSS);

        objects.push(objectCSS);
        typeToObject[code] = objectCSS;

        // Table layout target
        const tableObject = new THREE.Object3D();
        tableObject.position.x = (col * CONFIG.layout.table.columnSpacing) + CONFIG.layout.table.offsetX;
        tableObject.position.y = -(row * CONFIG.layout.table.rowSpacing) + CONFIG.layout.table.offsetY;
        targets.table.push(tableObject);
    }

    // Sphere layout
    const vector = new THREE.Vector3();
    for (let i = 0, l = objects.length; i < l; i++) {
        const phi = Math.acos(-1 + (2 * i) / l);
        const theta = Math.sqrt(l * Math.PI) * phi;

        const object = new THREE.Object3D();
        object.position.setFromSphericalCoords(CONFIG.layout.sphere.radius, phi, theta);
        vector.copy(object.position).multiplyScalar(2);
        object.lookAt(vector);
        targets.sphere.push(object);
    }

    // Helix layout
    for (let i = 0, l = objects.length; i < l; i++) {
        const theta = i * 0.2 + Math.PI;
        const y = -(i * CONFIG.layout.helix.spacing) + CONFIG.layout.helix.offsetY;

        const object = new THREE.Object3D();
        object.position.setFromCylindricalCoords(CONFIG.layout.helix.radius, theta, y);
        vector.x = object.position.x * 2;
        vector.y = object.position.y;
        vector.z = object.position.z * 2;
        object.lookAt(vector);
        targets.helix.push(object);
    }

    // Grid layout (8 cards × 4 layers)
    for (let i = 0; i < objects.length; i++) {
        const object = new THREE.Object3D();
        object.position.x = ((i % 8) * CONFIG.layout.grid.columnSpacing) - 1050;
        object.position.y = 0;
        object.position.z = (Math.floor(i / 8)) * CONFIG.layout.grid.rowSpacing - 600;
        targets.grid.push(object);
    }

    // Renderer
    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    // Controls with adjusted zoom limits
    controls = new TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 2.5;
    controls.zoomSpeed = 4.0;
    controls.panSpeed = 2.0;
    controls.dynamicDampingFactor = 0.12;
    controls.minDistance = CONFIG.camera.minDistance;
    controls.maxDistance = CONFIG.camera.maxDistance;
    controls.addEventListener('change', render);

    // Layout button events
    ['table', 'sphere', 'helix', 'grid'].forEach(id => {
        document.getElementById(id).addEventListener('click', function() {
            document.querySelectorAll('.layout-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            transform(targets[id], CONFIG.animation.transitionDuration);
        });
    });

    // Toggle lines button
    document.getElementById('toggle-lines').addEventListener('click', function() {
        showLinesGlobal = !showLinesGlobal;
        this.classList.toggle('active', showLinesGlobal);
        
        if (showLinesGlobal) {
            drawAllCompatibilityLines();
        } else {
            clearLines();
        }
    });

    // Close panel button
    document.getElementById('close-panel').addEventListener('click', () => {
        document.getElementById('compatibility-panel').classList.remove('visible');
        if (selectedElement) {
            selectedElement.classList.remove('selected');
            selectedElement = null;
        }
    });

    // Initial layout
    transform(targets.table, CONFIG.animation.transitionDuration);
    window.addEventListener('resize', onWindowResize);
}

function showCompatibilityPanel(typeCode, typeName, icon, element) {
    if (selectedElement) selectedElement.classList.remove('selected');
    element.classList.add('selected');
    selectedElement = element;

    document.getElementById('panel-icon').textContent = icon;
    document.getElementById('panel-type').textContent = typeCode;
    document.getElementById('panel-name').textContent = typeName;

    const compat = getCompatibility(typeCode);

    // Work compatibility
    if (compat.work.length === 0) {
        document.getElementById('work-compat').innerHTML = '<div class="no-data">データ準備中</div>';
    } else {
        document.getElementById('work-compat').innerHTML = compat.work.map(({ target, priority }) => {
            const p = PERSONALITIES.find(p => p[0] === target);
            const pIcon = p ? p[3] : '❓';
            const pName = p ? p[1] : '';
            const scoreClass = priority === '最良' ? 'best' : 'good';
            return `<div class="compat-item">
                <div class="header">
                    <span class="type-info">${pIcon} ${target}</span>
                    <span class="score ${scoreClass}">${priority}</span>
                </div>
                <div class="sub-name">${pName}</div>
            </div>`;
        }).join('');
    }

    // Love compatibility
    if (compat.love.length === 0) {
        document.getElementById('love-compat').innerHTML = '<div class="no-data">データ準備中</div>';
    } else {
        document.getElementById('love-compat').innerHTML = compat.love.map(({ target, priority }) => {
            const p = PERSONALITIES.find(p => p[0] === target);
            const pIcon = p ? p[3] : '❓';
            const pName = p ? p[1] : '';
            const scoreClass = priority === '最良' ? 'best' : 'good';
            return `<div class="compat-item">
                <div class="header">
                    <span class="type-info">${pIcon} ${target}</span>
                    <span class="score ${scoreClass}">${priority}</span>
                </div>
                <div class="sub-name">${pName}</div>
            </div>`;
        }).join('');
    }

    document.getElementById('compatibility-panel').classList.add('visible');
}

function getScreenPosition(object) {
    const vector = new THREE.Vector3();
    vector.setFromMatrixPosition(object.matrixWorld);
    vector.project(camera);
    return {
        x: (vector.x * 0.5 + 0.5) * window.innerWidth,
        y: (-vector.y * 0.5 + 0.5) * window.innerHeight
    };
}

function clearLines() {
    const elements = linesSvg.querySelectorAll('path, circle');
    elements.forEach(el => el.remove());
}

function createWavyPath(x1, y1, x2, y2, offset, amplitude) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len === 0) return `M ${x1} ${y1}`;
    
    const nx = -dy / len;
    const ny = dx / len;
    
    const ox1 = x1 + nx * offset;
    const oy1 = y1 + ny * offset;
    const ox2 = x2 + nx * offset;
    const oy2 = y2 + ny * offset;
    
    const time = animationTime;
    const segments = 30;
    let d = `M ${ox1} ${oy1}`;
    
    for (let i = 1; i <= segments; i++) {
        const t = i / segments;
        const px = ox1 + (ox2 - ox1) * t;
        const py = oy1 + (oy2 - oy1) * t;
        const wave = Math.sin(t * Math.PI * 3 + time * 1.5 + offset * 0.1) * amplitude;
        const wx = px + nx * wave;
        const wy = py + ny * wave;
        d += ` L ${wx} ${wy}`;
    }
    
    return d;
}

function createParticles(x1, y1, x2, y2, offset, color, count) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len === 0) return;
    
    const nx = -dy / len;
    const ny = dx / len;
    const time = animationTime;
    
    for (let i = 0; i < count; i++) {
        const baseT = (i / count + time * 0.08) % 1;
        const px = x1 + dx * baseT + nx * offset;
        const py = y1 + dy * baseT + ny * offset;
        const wave = Math.sin(baseT * Math.PI * 3 + time * 1.5 + offset * 0.1) * 8;
        const wx = px + nx * wave;
        const wy = py + ny * wave;
        const size = 1.2 + Math.sin(time * 3 + i) * 0.6;
        const particleOpacity = 0.12 + Math.sin(time * 4 + i * 0.5) * 0.08;
        
        const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        particle.setAttribute('cx', wx);
        particle.setAttribute('cy', wy);
        particle.setAttribute('r', size);
        particle.setAttribute('fill', color.replace(/[\d.]+\)$/, `${particleOpacity})`));
        linesSvg.appendChild(particle);
    }
}

function drawAllCompatibilityLines() {
    clearLines();
    
    Object.keys(COMPATIBILITY_DATA).forEach(typeCode => {
        const compat = getCompatibility(typeCode);
        const sourceObject = typeToObject[typeCode];
        if (!sourceObject) return;
        const sourcePos = getScreenPosition(sourceObject);

        // Work lines (green)
        compat.work.forEach(({ target, priority }) => {
            const targetObject = typeToObject[target];
            if (!targetObject) return;
            const targetPos = getScreenPosition(targetObject);
            
            const isBest = priority === '最良';
            const baseOpacity = isBest ? 0.12 : 0.05;
            const centerWidth = isBest ? 2 : 1;
            const particleCount = isBest ? 6 : 3;

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', createWavyPath(sourcePos.x, sourcePos.y, targetPos.x, targetPos.y, 0, 8));
            path.setAttribute('stroke', `rgba(74, 222, 128, ${baseOpacity})`);
            path.setAttribute('stroke-width', centerWidth);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke-linecap', 'round');
            linesSvg.appendChild(path);
            createParticles(sourcePos.x, sourcePos.y, targetPos.x, targetPos.y, 0, `rgba(74, 222, 128, 0.6)`, particleCount);
        });

        // Love lines (pink)
        compat.love.forEach(({ target, priority }) => {
            const targetObject = typeToObject[target];
            if (!targetObject) return;
            const targetPos = getScreenPosition(targetObject);
            
            const isBest = priority === '最良';
            const baseOpacity = isBest ? 0.12 : 0.05;
            const centerWidth = isBest ? 2 : 1;
            const particleCount = isBest ? 6 : 3;

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', createWavyPath(sourcePos.x, sourcePos.y, targetPos.x, targetPos.y, 15, 8));
            path.setAttribute('stroke', `rgba(244, 114, 182, ${baseOpacity})`);
            path.setAttribute('stroke-width', centerWidth);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke-linecap', 'round');
            linesSvg.appendChild(path);
            createParticles(sourcePos.x, sourcePos.y, targetPos.x, targetPos.y, 15, `rgba(244, 114, 182, 0.6)`, particleCount);
        });
    });
}

function drawCompatibilityLines(typeCode) {
    if (!typeCode) return;
    clearLines();

    const compat = getCompatibility(typeCode);
    const sourceObject = typeToObject[typeCode];
    if (!sourceObject) return;
    const sourcePos = getScreenPosition(sourceObject);

    // Work lines (green)
    compat.work.forEach(({ target, priority }) => {
        const targetObject = typeToObject[target];
        if (!targetObject) return;
        const targetPos = getScreenPosition(targetObject);
        
        const isBest = priority === '最良';
        const baseOpacity = isBest ? 0.3 : 0.15;
        const centerWidth = isBest ? 5 : 2;
        const outerWidth = isBest ? 2 : 0.8;
        const particleCount = isBest ? 18 : 10;

        [
            { offset: 0, width: centerWidth, amp: 10 },
            { offset: -10, width: outerWidth, amp: 6 },
            { offset: 10, width: outerWidth, amp: 6 }
        ].forEach(({ offset, width, amp }) => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', createWavyPath(sourcePos.x, sourcePos.y, targetPos.x, targetPos.y, offset, amp));
            path.setAttribute('stroke', `rgba(74, 222, 128, ${baseOpacity})`);
            path.setAttribute('stroke-width', width);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke-linecap', 'round');
            linesSvg.appendChild(path);
            createParticles(sourcePos.x, sourcePos.y, targetPos.x, targetPos.y, offset, `rgba(74, 222, 128, 1)`, particleCount);
        });
    });

    // Love lines (pink)
    compat.love.forEach(({ target, priority }) => {
        const targetObject = typeToObject[target];
        if (!targetObject) return;
        const targetPos = getScreenPosition(targetObject);
        
        const isBest = priority === '最良';
        const baseOpacity = isBest ? 0.3 : 0.15;
        const centerWidth = isBest ? 5 : 2;
        const outerWidth = isBest ? 2 : 0.8;
        const particleCount = isBest ? 18 : 10;

        [
            { offset: 20, width: centerWidth, amp: 10 },
            { offset: 10, width: outerWidth, amp: 6 },
            { offset: 30, width: outerWidth, amp: 6 }
        ].forEach(({ offset, width, amp }) => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', createWavyPath(sourcePos.x, sourcePos.y, targetPos.x, targetPos.y, offset, amp));
            path.setAttribute('stroke', `rgba(244, 114, 182, ${baseOpacity})`);
            path.setAttribute('stroke-width', width);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke-linecap', 'round');
            linesSvg.appendChild(path);
            createParticles(sourcePos.x, sourcePos.y, targetPos.x, targetPos.y, offset, `rgba(244, 114, 182, 1)`, particleCount);
        });
    });
}

function updateLines() {
    if (!linesSvg) return;
    
    if (showLinesGlobal) {
        drawAllCompatibilityLines();
    } else if (hoveredElement) {
        drawCompatibilityLines(hoveredElement.dataset.type);
    }
}

function transform(targets, duration) {
    TWEEN.removeAll();

    for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        const target = targets[i];

        new TWEEN.Tween(object.position)
            .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        new TWEEN.Tween(object.rotation)
            .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
    }

    new TWEEN.Tween({})
        .to({}, duration * 2)
        .onUpdate(render)
        .start();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function animate() {
    requestAnimationFrame(animate);
    animationTime += 0.016;
    TWEEN.update();
    controls.update();
}

function render() {
    renderer.render(scene, camera);
    updateLines();
}
