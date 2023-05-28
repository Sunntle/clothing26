var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const link = window.location.search;
const urlProduct = link.slice(1);
const url = `http://localhost:3000/products/${urlProduct}`;
const urlLoai = 'http://localhost:3000/categories';
function loadItem() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (yield fetch(url)).json();
        const categories = yield (yield fetch(urlLoai)).json();
        loadDataItem();
        function loadDataItem() {
            const chiTietSp = document.querySelector('#chitietsanpham');
            let imgString;
            let html;
            html =
                `<form name="fmk1">
                <div class="form-floating mb-3">
            <input type="text" name="name" class="form-control" value="${data.name}" id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">Tên sản phẩm</label>
            </div>
            <div class="form-floating mb-3">
            <input type="text" name="price" class="form-control" value="${data.price}" id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">Giá</label>
            </div>
            <p><span class="fw-bolder">Hình ảnh: </span>
            ${data.img.map((el, index) => imgString = `<p><span style="width:200px">${el}</span>: <img class="img-fluid bg-transparent px-3"  style="max-width: 100px" src="../asset/img/${el}"><button type="button" class="btn-close" id="btnClose" data-value="${index}" aria-label="Close"></button></p>`).join('')}
            </p> 
            <div class="mb-3">
                <input class="form-control" type="file" id="img">
            </div>
            <p><span class="fw-bolder">Loại:</span>
            <select class="form-select" aria-label="Default select example" id="idLoai">
            ${categories.map(el => `<option value="${el.id}" ${el.id === data.idLoai ? `selected` : ''}>${el.name}</option>`)}
            </select></p>
            <p><span class="fw-bolder">Màu sắc: </span>
            ${data.colors.map(el => el)}
            </p>
            <div class="mb-3">
                <input class="form-control" type="text" id="colors">
            </div>
            <div class="form-floating mb-3">
            <input type="date" name="date" class="form-control" value="${data.date}" id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">Ngày nhập</label>
            </div>
            <a class="btn btn-primary" id="update">Cập nhật</a>
                </form>
            `;
            chiTietSp.insertAdjacentHTML('beforeend', html);
        }
        const btnCloseAll = document.querySelectorAll('.btn-close');
        const btnUpdate = document.querySelector('#update');
        btnCloseAll.forEach(btnClose => {
            btnClose.addEventListener('click', e => {
                const event = e.target;
                const indexImg = event === null || event === void 0 ? void 0 : event.getAttribute('data-value');
                if (indexImg) {
                    data === null || data === void 0 ? void 0 : data.img.splice(+indexImg, 1);
                }
                handleUpdate(getForm());
            });
        });
        btnUpdate === null || btnUpdate === void 0 ? void 0 : btnUpdate.addEventListener('click', e => {
            handleUpdate(getForm());
            getForm();
        });
        let img = document.querySelector('#img');
        let hinhAnh;
        img.addEventListener("input", (event) => {
            const e = event.target.files;
            hinhAnh = e[0].name;
        });
        function getForm() {
            var _a, _b, _c;
            let name = document.querySelector('input[name="name"]');
            let price = document.querySelector('input[name="price"]');
            let idLoai = document.querySelector('#idLoai');
            let colors = document.querySelector('#colors');
            let date = document.querySelector('input[name="date"]');
            const data1 = {
                name: name.value,
                price: +price.value,
                idLoai: +idLoai.value,
                colors: [],
                img: [],
                size: {}
            };
            if (hinhAnh)
                (_a = data.img) === null || _a === void 0 ? void 0 : _a.push(hinhAnh);
            else if (img.value)
                (_b = data.img) === null || _b === void 0 ? void 0 : _b.push(img.value.toString());
            data1.img = [...data.img];
            if (colors.value)
                (_c = data.colors) === null || _c === void 0 ? void 0 : _c.push(colors.value.toString());
            data1.colors = [...data.colors];
            if (date.value)
                data1.date = date.value.toString();
            data1.size = Object.assign({}, data.size);
            return data1;
        }
    });
}
function handleUpdate(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(url, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        const result = yield res.json();
    });
}
loadItem();
export {};
