document.addEventListener("DOMContentLoaded", () => {
  const roles = [
    "UI/UX Designer",
    "Mobile Developer",
    "Front-End Developer",
    "Digital Artist"
  ];

  const textSpan = document.getElementById("typed-text");
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const current = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    textSpan.textContent = current.substring(0, charIndex);

    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === current.length) {
      speed = 1200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 500;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();
});


  

// navbar for header automate to make it bold
  window.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    function setActiveLink() {
      let current = 'home'; // ← نبدأ من home دائماً

      // لو المستخدم فوق أول سكشن
      if (window.scrollY < sections[0].offsetTop - 200) {
        current = 'home'; // ← خليك على Home
      } else {
        sections.forEach(section => {
          const sectionTop = section.offsetTop - 200;
          if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
          }
        });
      }

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }

    setActiveLink(); // ← عند تحميل الصفحة
    window.addEventListener('scroll', setActiveLink); // ← أثناء التمرير
  });

// عند تغيير الصفحة يظهر في التاب نوع الصفحة 
  window.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');

    function updateTitle() {
      let current = 'Home';

      sections.forEach(section => {
        const top = section.offsetTop - 200;
        if (window.scrollY >= top) {
          current = section.getAttribute('id');
        }
      });

      // غيّري العنوان حسب القسم
      let title = " Rama Sabbagh | ";
      if (current === 'home') title += 'Home';
      // else if (current === 'projects') title += 'My Projects';
      //  else if (current === 'skills') title += 'My Skills';
      else title += current.charAt(0).toUpperCase() + current.slice(1);

      document.title = title;
    }

    updateTitle(); // عند التحميل
    window.addEventListener('scroll', updateTitle); // أثناء التمرير
  });


// ينقلك لصفحة البروجكت على طول بالمنتصف بدون margin-top في الاعلى 
// للروابط اللي href="#projects"
document.querySelectorAll('a[href="#projects"]').forEach(el => {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.getElementById('projects');
    const offset = 100;

    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = target.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition + offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  });
});


// للتحكم بقائمة الجوال 
  const menuIcon = document.getElementById('menu-icon');
  const sidebar = document.getElementById('sidebar');
  const closeBtn = document.getElementById('close-btn');

  menuIcon.addEventListener('click', () => {
    sidebar.style.display = 'flex';
    menuIcon.style.display = 'none'; // أخفي زر المنيو
  });

  closeBtn.addEventListener('click', () => {
    sidebar.style.display = 'none';
    menuIcon.style.display = 'block'; // أرجع زر المنيو
  });

  // إغلاق السايدبار عند الضغط على أحد الروابط
  sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      sidebar.style.display = 'none';
      menuIcon.style.display = 'block';
    });
  });
//////////////
  const terminal = document.querySelector('.terminal');
  const lines = terminal.querySelectorAll('.terminal-content .line');
  let currentLine = 0;
  let typingStarted = false;

  // ترقيم الأسطر تلقائي
  lines.forEach((line, index) => {
    // نشيل أي رقم قديم لو موجود
    line.textContent = line.textContent.replace(/^\d+\.\s*/, '');
    // نضيف الرقم الجديد
    line.textContent = `${index + 1}. ${line.textContent}`;
  });

  // نخفي كل الأسطر في البداية
  lines.forEach(line => {
    line.style.opacity = '0';
  });

  function typeLine(line) {
    return new Promise(resolve => {
      line.style.opacity = '1';
      const text = line.textContent;
      line.textContent = '';
      line.classList.add('typing'); // شغل مؤشر الكتابة

      let i = 0;
      const interval = setInterval(() => {
        line.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          line.classList.remove('typing'); // طفي مؤشر الكتابة
          resolve();
        }
      }, 30);
    });
  }

  async function typeAllLines() {
    while (currentLine < lines.length) {
      await typeLine(lines[currentLine]);
      currentLine++;
    }
  }

  function startTyping() {
    if (!typingStarted) {
      typingStarted = true;
      typeAllLines();
    }
  }

  // عند الضغط على التيرمنال (احتياطي)
  terminal.addEventListener('click', startTyping);

  // تحقق اذا العنصر بالمنظر لتشغيل الكتابة تلقائي
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  function onScroll() {
    if (isElementInViewport(terminal)) {
      startTyping();
      window.removeEventListener('scroll', onScroll);
    }
  }

  window.addEventListener('scroll', onScroll);

  // تشغيل عند الضغط على رابط #about في القائمة لو موجود
  const aboutLink = document.querySelector('a[href="#about"]');
  if (aboutLink) {
    aboutLink.addEventListener('click', () => {
      startTyping();
    });
  }
////
