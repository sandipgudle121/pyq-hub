let allPapers = [];
let filteredPapers = [];

const fallbackPapers = [
  {
    id: 1,
    title: "Data Structures & Algorithms",
    subject: "Data Structures",
    code: "CS301",
    university: "Mumbai University",
    branch: "Computer Science",
    semester: 3,
    exam: "End Semester",
    year: 2023,
    size: "1.2 MB",
    pdf: "pdfs/mumbai/cs/dsa-endsem-2023.pdf",
    tags: ["Solved", "CS/IT"],
    solved: true,
    downloads: 1240,
    added: "2 days ago",
    notes: "Solution key included."
  },
  {
    id: 2,
    title: "Advanced Data Structures",
    subject: "Data Structures",
    code: "CS501",
    university: "Mumbai University",
    branch: "Computer Science",
    semester: 5,
    exam: "Mid Semester",
    year: 2024,
    size: "1.0 MB",
    pdf: "pdfs/mumbai/cs/ads-midsem-2024.pdf",
    tags: ["Unsolved", "CS"],
    solved: false,
    downloads: 812,
    added: "4 days ago",
    notes: "Mid sem question paper."
  },
  {
    id: 3,
    title: "Data Structures",
    subject: "Data Structures",
    code: "CS301",
    university: "VTU Karnataka",
    branch: "Computer Science",
    semester: 3,
    exam: "End Semester",
    year: 2022,
    size: "900 KB",
    pdf: "pdfs/vtu/cs/ds-endsem-2022.pdf",
    tags: ["With Notes", "VTU"],
    solved: true,
    downloads: 650,
    added: "1 week ago",
    notes: "Handwritten notes attached."
  },
  {
    id: 4,
    title: "DS & Algorithms",
    subject: "Data Structures",
    code: "CS401",
    university: "Anna University",
    branch: "Computer Science",
    semester: 4,
    exam: "End Semester",
    year: 2021,
    size: "1.4 MB",
    pdf: "pdfs/anna/cs/dsa-endsem-2021.pdf",
    tags: ["Solved", "Anna Univ"],
    solved: true,
    downloads: 980,
    added: "1 week ago",
    notes: "Frequently repeated questions."
  },
  {
    id: 5,
    title: "DBMS Winter 2025",
    subject: "DBMS",
    code: "CS302",
    university: "Pune University",
    branch: "Computer Science",
    semester: 3,
    exam: "Winter",
    year: 2025,
    size: "1.3 MB",
    pdf: "pdfs/sppu/cs/dbms-winter-2025.pdf",
    tags: ["Solved", "SPPU"],
    solved: true,
    downloads: 1430,
    added: "Today",
    notes: "Contains SQL and normalization sections."
  },
  {
    id: 6,
    title: "DBMS Summer 2024",
    subject: "DBMS",
    code: "CS302",
    university: "Pune University",
    branch: "Computer Science",
    semester: 3,
    exam: "Summer",
    year: 2024,
    size: "1.1 MB",
    pdf: "pdfs/sppu/cs/dbms-summer-2024.pdf",
    tags: ["Unsolved", "SPPU"],
    solved: false,
    downloads: 754,
    added: "3 days ago",
    notes: "Good for exam pattern practice."
  },
  {
    id: 7,
    title: "Engineering Mathematics II",
    subject: "Engineering Maths",
    code: "MA201",
    university: "VTU Karnataka",
    branch: "Electronics",
    semester: 2,
    exam: "Mid Semester",
    year: 2024,
    size: "1.0 MB",
    pdf: "pdfs/vtu/elec/em2-midsem-2024.pdf",
    tags: ["Unsolved", "VTU"],
    solved: false,
    downloads: 540,
    added: "4 days ago",
    notes: "Calculus-heavy paper."
  },
  {
    id: 8,
    title: "Thermodynamics",
    subject: "Thermodynamics",
    code: "ME204",
    university: "Pune University",
    branch: "Mechanical",
    semester: 4,
    exam: "End Semester",
    year: 2023,
    size: "1.5 MB",
    pdf: "pdfs/sppu/me/thermo-endsem-2023.pdf",
    tags: ["Solved", "Mechanical"],
    solved: true,
    downloads: 1090,
    added: "1 week ago",
    notes: "Covers Rankine cycle and entropy."
  }
];

function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page-' + name);
  if (page) page.classList.add('active');
  window.scrollTo(0, 0);
  if (name === 'browse') renderBrowse();
  if (name === 'detail') renderDetail(getSelectedPaper());
}

function setActive(id) {
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  if (id) document.getElementById(id)?.classList.add('active');
}

function openDetail(paperId) {
  window.location.href = `detail.html?id=${paperId}`;
}

function handleFile(input) {
  if (input.files && input.files[0]) {
    document.getElementById('fileName').textContent = input.files[0].name;
    document.getElementById('fileChosen').style.display = 'flex';
    document.getElementById('fileDrop').style.display = 'none';
  }
}

function handleDrop(e) {
  e.preventDefault();
  document.getElementById('fileDrop').classList.remove('drag');
  const file = e.dataTransfer.files[0];
  if (file) {
    document.getElementById('fileName').textContent = file.name;
    document.getElementById('fileChosen').style.display = 'flex';
    document.getElementById('fileDrop').style.display = 'none';
  }
}

function clearFile() {
  document.getElementById('fileChosen').style.display = 'none';
  document.getElementById('fileDrop').style.display = 'block';
  document.getElementById('fileInput').value = '';
}

function submitUpload() {
  showToast('✅ Paper uploaded successfully! Under review.');
  setTimeout(() => showPage('home'), 1800);
}

function showDownloadToast() {
  showToast('✅ Download started!');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function normalize(value) {
  return String(value ?? '').toLowerCase();
}

function ordinal(n) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return `${n}${suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]}`;
}

function getFilterValues(containerId) {
  return Array.from(document.querySelectorAll(`#${containerId} input[type="checkbox"]:checked`)).map(input => input.value);
}

function getSelectedPaper() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id'));
  return allPapers.find(p => p.id === id) || filteredPapers[0] || allPapers[0] || fallbackPapers[0];
}

function matchesQuery(paper, query) {
  if (!query) return true;
  const haystack = [
    paper.subject,
    paper.title,
    paper.code,
    paper.university,
    paper.branch,
    paper.semester,
    paper.exam,
    paper.year
  ].map(normalize).join(' ');
  return haystack.includes(normalize(query));
}

function matchesMultiSelect(paper, values, field) {
  if (!values.length) return true;
  return values.includes(String(paper[field]));
}

function getSortValue() {
  return document.getElementById('sortSelect')?.value || 'newest';
}

function renderBrowse() {
  const query = document.getElementById('browseSearch')?.value || '';
  const universities = getFilterValues('filter-university');
  const branches = getFilterValues('filter-branch');
  const semesters = getFilterValues('filter-semester');
  const exams = getFilterValues('filter-exam');
  const solvedOnly = document.getElementById('filter-solved')?.checked;

  let items = allPapers.filter(paper =>
    matchesQuery(paper, query) &&
    matchesMultiSelect(paper, universities, 'university') &&
    matchesMultiSelect(paper, branches, 'branch') &&
    matchesMultiSelect(paper, semesters, 'semester') &&
    matchesMultiSelect(paper, exams, 'exam') &&
    (!solvedOnly || paper.solved)
  );

  switch (getSortValue()) {
    case 'oldest':
      items.sort((a, b) => a.year - b.year || a.id - b.id);
      break;
    case 'title-asc':
      items.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'title-desc':
      items.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'newest':
    default:
      items.sort((a, b) => b.year - a.year || b.id - a.id);
      break;
  }

  filteredPapers = items;

  const list = document.getElementById('papersList');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('resultsCount');
  if (!list || !empty || !count) return;

  count.innerHTML = `Showing <span>${items.length} result${items.length === 1 ? '' : 's'}</span>${query ? ` for "${query}"` : ''}`;

  if (!items.length) {
    list.innerHTML = '';
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';
  list.innerHTML = items.map(paper => {
    const badgeClass = paper.solved ? 'badge-green' : paper.tags.some(t => normalize(t).includes('notes')) ? 'badge-blue' : 'badge-amber';
    const badgeText = paper.solved ? '✓ Solved' : paper.tags[0] || 'Paper';
    return `
      <div class="paper-card" data-paper-id="${paper.id}">
        <div class="paper-card-icon">📄</div>
        <div class="paper-card-body">
          <div class="paper-card-title">${paper.title} — ${paper.exam} ${paper.year}</div>
          <div class="paper-card-sub">${paper.university} · ${paper.branch} · Semester ${paper.semester}</div>
          <div class="paper-card-tags">
            <span class="tag">${paper.year}</span>
            <span class="tag">${paper.exam}</span>
            <span class="tag">${paper.code}</span>
            <span class="badge ${badgeClass}" style="font-size:11px">${badgeText}</span>
          </div>
        </div>
        <div class="paper-card-actions">
          <a class="download-btn" title="Download PDF" href="${paper.pdf}" download>⬇</a>
        </div>
      </div>
    `;
  }).join('');

  list.querySelectorAll('.paper-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = Number(card.dataset.paperId);
      const paper = allPapers.find(p => p.id === id);
      if (paper) {
        openDetail(paper.id);
      }
    });
  });
}

function renderDetail(paper) {
  if (!paper) return;
  const title = document.querySelector('.detail-title');
  const desc = document.querySelector('.detail-desc');
  const previewTitle = document.querySelector('.pdf-preview-title');
  const previewName = document.querySelector('[data-preview-name]');
  const detailRows = document.querySelectorAll('.detail-grid .info-card');
  if (!title || !desc || !previewTitle || detailRows.length < 2) return;

  title.textContent = `${paper.title} — ${paper.exam} ${paper.year}`;
  desc.textContent = paper.notes || `${paper.exam} paper for ${paper.branch} students, Semester ${paper.semester}.`;
  previewTitle.textContent = `📄 ${paper.code}_${paper.year}.pdf — Preview`;

  const infoRows = detailRows[0].querySelectorAll('.info-row-value');
  const fileRows = detailRows[1].querySelectorAll('.info-row-value');
  if (infoRows.length >= 6) {
    infoRows[0].textContent = paper.university;
    infoRows[1].textContent = paper.branch;
    infoRows[2].textContent = `${ordinal(paper.semester)} Semester`;
    infoRows[3].textContent = paper.year;
    infoRows[4].textContent = paper.exam;
    infoRows[5].textContent = paper.code;
  }
  if (fileRows.length >= 6) {
    fileRows[0].textContent = 'PDF';
    fileRows[1].textContent = paper.size;
    fileRows[2].textContent = '4';
    fileRows[3].textContent = 'You';
    fileRows[4].textContent = 'Today';
    fileRows[5].textContent = paper.downloads?.toLocaleString?.() || '0';
  }

  const subjectCrumb = document.querySelector('[data-detail-subject]');
  const examCrumb = document.querySelector('[data-detail-exam]');
  const downloadLinks = document.querySelectorAll('[data-download-link]');
  const pdfPreview = document.querySelector('[data-pdf-preview]');
  if (subjectCrumb) subjectCrumb.textContent = paper.subject;
  if (examCrumb) examCrumb.textContent = `${paper.exam} ${paper.year}`;
  downloadLinks.forEach(link => {
    link.href = paper.pdf;
    link.download = '';
  });
  if (pdfPreview) pdfPreview.src = paper.pdf;
  if (previewName) previewName.textContent = `${paper.code}_${paper.year}.pdf`;
  const universityChip = document.querySelector('[data-detail-university]');
  const statusChip = document.querySelector('[data-detail-status]');
  const downloadsChip = document.querySelector('[data-detail-downloads]');
  if (universityChip) universityChip.textContent = paper.university;
  if (statusChip) statusChip.textContent = paper.solved ? '✓ Solved' : 'Unsolved';
  if (downloadsChip) downloadsChip.textContent = `📥 ${paper.downloads?.toLocaleString?.() || '0'} downloads`;
  document.title = `${paper.title} — PYQHub`;
}

async function loadPapers() {
  try {
    const response = await fetch('data/papers.json');
    if (!response.ok) throw new Error('Failed to load JSON');
    allPapers = await response.json();
  } catch {
    allPapers = fallbackPapers;
  }
  renderBrowse();
  renderDetail(getSelectedPaper());
}

function bindBrowseControls() {
  const browseSearch = document.getElementById('browseSearch');
  const sortSelect = document.getElementById('sortSelect');
  const applyBtn = document.getElementById('applyFiltersBtn');
  const clearBtn = document.getElementById('clearFiltersBtn');
  const searchBtn = document.getElementById('searchBtn');
  const solved = document.getElementById('filter-solved');

  const rerender = () => renderBrowse();

  browseSearch?.addEventListener('input', rerender);
  sortSelect?.addEventListener('change', rerender);
  solved?.addEventListener('change', rerender);
  applyBtn?.addEventListener('click', rerender);
  searchBtn?.addEventListener('click', rerender);

  document.querySelectorAll('#filter-university input, #filter-branch input, #filter-semester input, #filter-exam input').forEach(input => {
    input.addEventListener('change', rerender);
  });

  clearBtn?.addEventListener('click', () => {
    document.querySelectorAll('#filter-university input, #filter-branch input, #filter-semester input, #filter-exam input').forEach(input => {
      input.checked = false;
    });
    if (solved) solved.checked = false;
    if (browseSearch) browseSearch.value = '';
    document.querySelector('#filter-university input[value="Mumbai University"]').checked = true;
    document.querySelector('#filter-branch input[value="Computer Science"]').checked = true;
    document.querySelector('#filter-semester input[value="3"]').checked = true;
    document.querySelector('#filter-exam input[value="End Semester"]').checked = true;
    renderBrowse();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  bindBrowseControls();
  loadPapers();
});
