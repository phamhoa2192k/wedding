(function () {
  'use strict';

  const SAKURA_PALETTES = [
    {
      base: 'rgba(255, 245, 248, 0.95)',
      mid: 'rgba(255, 192, 203, 0.88)',
      tip: 'rgba(255, 143, 171, 0.92)'
    },
    {
      base: 'rgba(255, 240, 245, 0.95)',
      mid: 'rgba(255, 175, 195, 0.88)',
      tip: 'rgba(238, 98, 134, 0.92)'
    },
    {
      base: 'rgba(255, 255, 255, 0.96)',
      mid: 'rgba(255, 218, 226, 0.85)',
      tip: 'rgba(255, 168, 188, 0.88)'
    },
    {
      base: 'rgba(254, 238, 242, 0.95)',
      mid: 'rgba(249, 168, 193, 0.88)',
      tip: 'rgba(244, 114, 182, 0.90)'
    }
  ];

  class SakuraParticle {
    constructor(width, height, isInitial = false) {
      this.reset(width, height, isInitial);
    }

    reset(width, height, isInitial = false) {

      this.type = Math.random() < 0.1 ? 'flower' : 'petal';

      if (this.type === 'flower') {
        this.w = (Math.random() * 10 + 16) * 3 / 4;
        this.h = this.w * 2 / 3;
      } else {
        this.w = (Math.random() * 11 + 11) * 3 / 4;
        this.h = (this.w * (Math.random() * 0.28 + 1.18)) * 2 / 3;
      }

      this.x = Math.random() * (width + 60) - 30;
      this.y = isInitial ? Math.random() * height : -this.h - Math.random() * 40;

      this.speedY = Math.random() * 0.85 + 0.8;
      this.speedX = Math.random() * 0.5 + 0.25;

      this.angle = Math.random() * 360;
      this.angularSpeed = (Math.random() - 0.5) * 1.4;

      this.flipX = Math.random() * Math.PI * 2;
      this.flipY = Math.random() * Math.PI * 2;
      this.flipSpeedX = Math.random() * 0.025 + 0.015;
      this.flipSpeedY = Math.random() * 0.02 + 0.01;

      this.swayAngle = Math.random() * Math.PI * 2;
      this.swaySpeed = Math.random() * 0.02 + 0.014;
      this.swayRadius = Math.random() * 1.5 + 0.6;

      this.opacity = Math.random() * 0.3 + 0.65;
      this.colors = SAKURA_PALETTES[Math.floor(Math.random() * SAKURA_PALETTES.length)];
    }

    update(width, height, wind, pointer) {

      this.swayAngle += this.swaySpeed;
      this.flipX += this.flipSpeedX;
      this.flipY += this.flipSpeedY;
      this.angle += this.angularSpeed;

      const sway = Math.sin(this.swayAngle) * this.swayRadius;
      this.x += this.speedX + sway + wind;
      this.y += this.speedY + Math.cos(this.swayAngle * 0.5) * 0.25;

      if (pointer && pointer.active) {
        const dx = this.x - pointer.x;
        const dy = this.y - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = pointer.radius || 110;

        if (dist < radius && dist > 0) {
          const force = (radius - dist) / radius;
          this.x += (dx / dist) * force * 3.5;
          this.y += (dy / dist) * force * 2.2;
          this.angularSpeed += (dx > 0 ? 0.05 : -0.05) * force;
        }
      }

      if (this.y > height + 40) {
        this.reset(width, height, false);
      } else if (this.x > width + 60) {
        this.x = -40;
      } else if (this.x < -60) {
        this.x = width + 40;
      }
    }

    draw(ctx) {
      if (this.type === 'flower') {
        this.drawFlower(ctx);
      } else {
        this.drawPetal(ctx);
      }
    }

    drawPetal(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.angle * Math.PI) / 180);

      const flipScaleX = Math.cos(this.flipX);
      const flipScaleY = 0.85 + 0.15 * Math.sin(this.flipY);
      ctx.scale(flipScaleX, flipScaleY);

      const isBack = flipScaleX < 0;
      ctx.globalAlpha = this.opacity * (isBack ? 0.85 : 1.0);

      const w = this.w;
      const h = this.h;

      ctx.beginPath();

      ctx.moveTo(0, h * 0.48);

      ctx.bezierCurveTo(-w * 0.55, h * 0.2, -w * 0.52, -h * 0.25, -w * 0.24, -h * 0.48);

      ctx.quadraticCurveTo(0, -h * 0.32, w * 0.24, -h * 0.48);

      ctx.bezierCurveTo(w * 0.52, -h * 0.25, w * 0.55, h * 0.2, 0, h * 0.48);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, h * 0.48, 0, -h * 0.48);
      grad.addColorStop(0, this.colors.base);
      grad.addColorStop(0.55, this.colors.mid);
      grad.addColorStop(1, this.colors.tip);

      ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(255, 182, 193, 0.3)';
      ctx.shadowBlur = 3;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, h * 0.38);
      ctx.quadraticCurveTo(w * 0.04, 0, 0, -h * 0.24);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.restore();
    }

    drawFlower(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.angle * Math.PI) / 180);

      const scaleX = Math.cos(this.flipX) * 0.35 + 0.65;
      const scaleY = 0.85 + 0.15 * Math.sin(this.flipY);
      ctx.scale(scaleX, scaleY);
      ctx.globalAlpha = this.opacity;

      const r = this.w * 0.5;

      for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.rotate((i * 72 * Math.PI) / 180);
        ctx.translate(0, -r * 0.55);

        const pw = r * 0.65;
        const ph = r * 0.78;

        ctx.beginPath();
        ctx.moveTo(0, ph * 0.48);
        ctx.bezierCurveTo(-pw * 0.55, ph * 0.2, -pw * 0.52, -ph * 0.25, -pw * 0.24, -ph * 0.48);
        ctx.quadraticCurveTo(0, -ph * 0.32, pw * 0.24, -ph * 0.48);
        ctx.bezierCurveTo(pw * 0.52, -ph * 0.25, pw * 0.55, ph * 0.2, 0, ph * 0.48);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, ph * 0.48, 0, -ph * 0.48);
        grad.addColorStop(0, 'rgba(255, 245, 248, 0.95)');
        grad.addColorStop(0.6, 'rgba(255, 185, 202, 0.88)');
        grad.addColorStop(1, 'rgba(244, 120, 152, 0.92)');
        ctx.fillStyle = grad;
        ctx.shadowColor = 'rgba(255, 182, 193, 0.3)';
        ctx.shadowBlur = 3;
        ctx.fill();

        ctx.restore();
      }

      ctx.beginPath();
      ctx.arc(0, 0, r * 0.16, 0, Math.PI * 2);
      ctx.fillStyle = '#fca5a5';
      ctx.fill();

      for (let j = 0; j < 5; j++) {
        const a = (j * 72 + 36) * Math.PI / 180;
        const sx = Math.cos(a) * r * 0.17;
        const sy = Math.sin(a) * r * 0.17;
        ctx.beginPath();
        ctx.arc(sx, sy, r * 0.05, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fill();
      }

      ctx.restore();
    }
  }

  class SakuraController {
    constructor(options = {}) {
      this.options = Object.assign(
        {
          canvasId: 'sakura-canvas',
          petalCount: 'auto',
          windSpeed: 0.7,
          fallSpeed: 1.1,
          interactive: true
        },
        options
      );

      this.canvas = null;
      this.ctx = null;
      this.particles = [];
      this.animationFrameId = null;
      this.isRunning = false;
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);

      this.globalWind = 0;
      this.windTime = 0;

      this.pointer = {
        x: -9999,
        y: -9999,
        active: false,
        radius: 110,
        decayTimer: null
      };

      this.init();
    }

    init() {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      this.setupCanvas();
      this.setupParticles();
      this.bindEvents();
      this.start();
    }

    setupCanvas() {
      let canvas = document.getElementById(this.options.canvasId);
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = this.options.canvasId;
        document.body.prepend(canvas);
      }

      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.resize();
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);

      this.canvas.width = Math.floor(this.width * this.dpr);
      this.canvas.height = Math.floor(this.height * this.dpr);

      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(this.dpr, this.dpr);
    }

    getOptimalPetalCount() {
      if (typeof this.options.petalCount === 'number' && this.options.petalCount > 0) {
        return this.options.petalCount;
      }

      if (this.width < 768) {
        return 14;
      } else if (this.width < 1200) {
        return 20;
      } else {
        return 25;
      }
    }

    setupParticles() {
      const count = this.getOptimalPetalCount();
      this.particles = [];
      for (let i = 0; i < count; i++) {
        this.particles.push(new SakuraParticle(this.width, this.height, true));
      }
    }

    bindEvents() {
      let resizeTimeout = null;
      window.addEventListener(
        'resize',
        () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            this.resize();
          }, 150);
        },
        { passive: true }
      );

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.stop();
        } else {
          this.start();
        }
      });

      if (this.options.interactive) {
        const handleMove = (x, y) => {
          this.pointer.x = x;
          this.pointer.y = y;
          this.pointer.active = true;

          clearTimeout(this.pointer.decayTimer);
          this.pointer.decayTimer = setTimeout(() => {
            this.pointer.active = false;
          }, 600);
        };

        window.addEventListener(
          'mousemove',
          (e) => {
            handleMove(e.clientX, e.clientY);
          },
          { passive: true }
        );

        window.addEventListener(
          'touchmove',
          (e) => {
            if (e.touches && e.touches.length > 0) {
              handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }
          },
          { passive: true }
        );
      }
    }

    start() {
      if (this.isRunning) return;
      this.isRunning = true;

      const loop = () => {
        if (!this.isRunning) return;

        this.windTime += 0.01;
        this.globalWind = Math.sin(this.windTime * 0.4) * 0.45 + (this.options.windSpeed || 0.6) * 0.4;

        this.ctx.clearRect(0, 0, this.width + 10, this.height + 10);

        const len = this.particles.length;
        for (let i = 0; i < len; i++) {
          const p = this.particles[i];
          p.update(this.width, this.height, this.globalWind, this.pointer);
          p.draw(this.ctx);
        }

        this.animationFrameId = requestAnimationFrame(loop);
      };

      this.animationFrameId = requestAnimationFrame(loop);
    }

    stop() {
      this.isRunning = false;
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    }

    toggle() {
      if (this.isRunning) {
        this.stop();
        this.ctx.clearRect(0, 0, this.width + 10, this.height + 10);
      } else {
        this.start();
      }
    }
  }

  window.SakuraEffect = null;

  window.initSakuraEffect = function (customOptions = {}) {
    const configOptions = (typeof WEDDING_CONFIG !== 'undefined' && WEDDING_CONFIG.sakura)
      ? WEDDING_CONFIG.sakura
      : {};

    const options = Object.assign({}, configOptions, customOptions);

    if (options.enable === false) {
      return null;
    }

    if (!window.SakuraEffect) {
      window.SakuraEffect = new SakuraController(options);
    }
    return window.SakuraEffect;
  };

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(window.initSakuraEffect, 1);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      window.initSakuraEffect();
    });
  }
})();
