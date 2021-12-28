/** UTILS */
const $ = id => document.getElementById(id)
const VALID_EXTENCIONS = ["application/pdf"]
const CLASS_DRAG_ACTIVE = 'input-pdf__drag--active'
const ERROR = ` <span class="error">El tipo de archivo seleccionado no es admitido. Debe ser tipo <b>PDF</b>.</span>`
const ACCTIONS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
}
const ManageClassList = (element, className, acction) => {
  if (acction === ACCTIONS.INACTIVE) element.classList.remove(className)
  if (acction === ACCTIONS.ACTIVE) element.classList.add(className)
}

/** DOM MANAGMENT */
const pdfDrag = $('pdf-drag')
const pdfInput = $('pdf-input')
const pdfDescription = $('pdf-description')
const btnGo = $('btn-go')
const listErrors = $('errors')
const viewResource = $('view-resource')
const displayResource = $('display-resource')
let resourceURL = ''

/* EVENTS */
pdfDrag.ondragover = event => {
  event.preventDefault()
  ManageClassList(pdfDrag, CLASS_DRAG_ACTIVE, ACCTIONS.ACTIVE)
}
pdfDrag.ondragleave = ManageClassList.bind(this, pdfDrag, CLASS_DRAG_ACTIVE, ACCTIONS.INACTIVE)
pdfDrag.onclick = pdfInput.click.bind(pdfInput)
pdfDrag.ondrop = (event) => {
    event.preventDefault();
    showFile(event.dataTransfer.files[0])
}
pdfInput.onchange = function() {
  showFile(this.files[0])
}
btnGo.onclick = () => {
    ManageClassList(viewResource, 'element-dblock', ACCTIONS.ACTIVE)
    displayResource.src = resourceURL
}

function showFile(file = '') {
  if (VALID_EXTENCIONS.includes(file.type)) { 
    ManageClassList(btnGo, 'element-dblock', ACCTIONS.ACTIVE)
    pdfDescription.innerText = file.name
    resourceURL = URL.createObjectURL(file)
  } else {
    listErrors.innerHTML = ERROR
  }
  ManageClassList(pdfDrag, CLASS_DRAG_ACTIVE, ACCTIONS.INACTIVE)
}
