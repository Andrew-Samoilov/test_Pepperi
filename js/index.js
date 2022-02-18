console.log(`777`);
const addForm = document.querySelector('.add-form');
const addFormInput = document.querySelector('.add-form-input');
const pairListTextArea = document.querySelector('.edit-form-text-area');
const editFormBtnSortName = document.querySelector('.edit-form-btn-sort-name');
const editFormBtnSortValue = document.querySelector('.edit-form-btn-sort-value');
const editFormBtnDel = document.querySelector('.edit-form-btn-del');
const editFormBtnShow = document.querySelector('.edit-form-btn-show');

let resArr = [];
addForm.addEventListener('submit', onAddFormSubmit);
editFormBtnSortName.addEventListener('click', onSortName);
editFormBtnSortValue.addEventListener('click', onSortValue);
pairListTextArea.addEventListener('change', onPairListChange);
editFormBtnDel.addEventListener('click', onDel);
editFormBtnShow.addEventListener('click', onShow);

function onPairListChange() {
    console.log('func onPairListChange', resArr);
    if (resArr.length === 0) {
        editFormBtnSortName.disabled = true;
        editFormBtnSortValue.disabled = true;
        editFormBtnDel.disabled = true;
    }
    if (resArr.length === 1) {
        editFormBtnDel.disabled = false;
    }
    if (resArr.length > 1) {
        editFormBtnSortName.disabled = false;
        editFormBtnSortValue.disabled = false;
        editFormBtnDel.disabled = false;
    }
}

function onAddFormSubmit(e) {
    e.preventDefault();
    // console.log(` func onAddFormSubmit`, addFormInput.value);
    addToList(addFormInput.value);
    onPairListChange();
    renderForm();
}

function addToList(listItemToAdd) {
    console.log(` func addToList`, listItemToAdd);
    //simple error catching , double '=' or any errors not check
    if (!listItemToAdd) return;
    if (listItemToAdd.includes('=') === false) {
        console.log(` ! error no '='`);
        return;
    };


    const itemToAdd = {
        name: listItemToAdd.split('=')[0].trim(),
        value: listItemToAdd.split('=')[1].trim(),
    }
    resArr.push(itemToAdd);
}

function renderForm() {
    console.log(` func renderForm`, ...resArr);
    let textToScreen = [];
    for (let index = 0; index < resArr.length; index++) {
        textToScreen.push(`${resArr[index].name} = ${resArr[index].value}`);
    }
    // console.log(`textToScreen`, textToScreen.join('\n'));
    pairListTextArea.value = textToScreen.join('\n');
}

function onSortName() {
    console.log(`func sort by Name`);
    resArr.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    renderForm();
}

function onSortValue() {
    console.log(`func sort by Value`);
    resArr.sort((a, b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0))
    renderForm();
}

function onDel() {
    let position = pairListTextArea.selectionStart;
    // console.log(`func onDel, position=`, position);

    let tmpSum = 0;
    for (let index = 0; index < resArr.length; index++) {
        tmpSum += resArr[index].name.length + 3 + resArr[index].value.length;
        // console.log(`tmpSum`, tmpSum);
        if (position <= tmpSum) {
            // console.log('delete this');
            resArr.splice(index, 1);
            break;
        }
    }
    renderForm();
}

function onShow() {
    console.log(` func onShow`, ...resArr);
    let xmlToScreen = [];

    xmlToScreen.push('<list-of-pairs>');
    for (let index = 0; index < resArr.length; index++) {
        xmlToScreen.push(` <name>${resArr[index].name}</name> = <value>${resArr[index].value}</value>`);
    }
    xmlToScreen.push('<note>* I can render whatever you want :)</note>');
    xmlToScreen.push('</list-of-pairs>');

    console.log(`xmlToScreen`, xmlToScreen.join('\n'));
    alert(`${xmlToScreen.join('\n')}`);
}