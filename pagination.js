let jsondata = JSON.parse(data);
console.log(jsondata);

for (let i = 0; i < jsondata.length; i++) {
    console.log(jsondata[i].id, jsondata[i].name, jsondata[i].email)
}

const div1 = document.createElement('div');
div1.setAttribute("class", "div1");
const label = document.createElement('label');
label.innerHTML = "view data per page:  ";
const select = document.createElement('select');
select.setAttribute("class", "dataPerPage");
select.innerHTML = `
  <option value="5">5</option>
  <option value="10">10</option>
  <option value="15">15</option>
  <option value="20">20</option>`;
label.append(select);
div1.append(label);
document.body.append(div1);

const div2 = document.createElement('div');
div2.setAttribute("class", "table");
div2.innerHTML = `<table>
<thead>
    <tr>
        <th>Id</th>
        <th>Name</th>
        <th>E-mail</th>
    </tr>
</thead>
<tbody></tbody>
</table>`;
document.body.append(div2);

const div3 = document.createElement('div');
div3.setAttribute("class", "pagination");
document.body.append(div3);
const ul = document.createElement('ul');
div3.append(ul);

let totalPages = Math.ceil(jsondata.length / 5); 
let page = 1; // current page

select.onchange = function () {
    let dataPerPage = Math.ceil(jsondata.length / parseInt(select.value));
    createPagination(dataPerPage, 1);
}

createPagination(totalPages, page);  

function createPagination(totalPages, page) {

    let liTag = '';
    let active;
    let beforePage = page - 2;
    let afterPage = page + 2;

    if (page > 1) {
        liTag += ` <li class="first btn" onclick="createPagination( ${totalPages}, ${1})">First</li>
        <li class="prev btn" onclick="createPagination( ${totalPages}, ${page - 1})">Prev</li>`
    }

    if (page == 1) {
        beforePage = 1;
        afterPage = 5;
    } else if (page == 2) {
        beforePage = 1;
        afterPage = 5;
    }

    if (page == totalPages) {
        beforePage = totalPages - 4;
        afterPage = totalPages;
    } else if (page == totalPages - 1) {
        beforePage = totalPages - 4;
        afterPage = totalPages;
    }

    if (totalPages < 5) {
        beforePage = 1;
        afterPage = totalPages;
    }

    for (let pLen = beforePage; pLen <= afterPage; pLen++) {
        if (page === pLen) {
            active = "active";
        } else {
            active = "";
        }

        liTag += `<li class="number ${active}" onclick="createPagination(${totalPages}, ${pLen})">${pLen}</li>`
    }

    if (page < totalPages) {
        liTag += ` <li class="next btn" onclick="createPagination( ${totalPages}, ${page + 1})">Next</li>
        <li class="last btn" onclick="createPagination( ${totalPages}, ${totalPages})">Last</li>`
     }

    console.log(totalPages, page);

    document.querySelector("tbody").innerHTML = "";

    let dataPerPage = document.querySelector('.dataPerPage').value;
    let rowFirst = page * (+dataPerPage) - (+dataPerPage);
    let rowLast = rowFirst + (+dataPerPage);
    try {
        for (let i = rowFirst; i < rowLast; i++) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${jsondata[i].id}</td>
                        <td>${jsondata[i].name}</td>
                        <td>${jsondata[i].email}</td>`;
            document.querySelector("tbody").append(tr);
        }
    }
    catch (err) {
        console.log("JSON data ended");
    }

    ul.innerHTML = liTag;
}