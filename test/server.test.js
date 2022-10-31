"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm = require("typeorm");
const products = [
    {
        _id: "5f2678dff22e1f4a3c0782ee",
        name: "JBL Headphone",
        category: "Electronic appliances",
        unit: 1,
    },
];
const dbMock = {
    Product: {
        find: jest.fn().mockReturnValue(products),
        findOne: jest.fn().mockReturnValue(products[0]),
        save: jest.fn().mockReturnValue(products[0]),
        remove: jest.fn(),
    },
};
typeorm.createConnection = jest.fn().mockReturnValue({
    getRepository: (model) => dbMock[model.name],
});
typeorm.getConnectionOptions = jest.fn().mockReturnValue({});
describe("Server", () => {
    let server;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        server = yield require("../src/index");
        yield server.ready();
    }));
    afterAll(() => server.close());
    test("/health returns ok", (done) => {
        server.inject({
            method: "GET",
            url: "/health",
        }, (err, res) => {
            expect(res.statusCode).toBe(200);
            expect(JSON.parse(res.payload)).toEqual({ status: "ok" });
            done(err);
        });
    });
    test("GET /product/:_id returns one of product by _id", (done) => {
        server.inject({
            method: "GET",
            url: `/product/${products[0]._id}`,
        }, (err, res) => {
            expect(res.statusCode).toBe(200);
            expect(dbMock.Product.findOne).toHaveBeenCalledWith(products[0]._id);
            expect(JSON.parse(res.payload)).toEqual(products[0]);
            done(err);
        });
    });
    test("GET /product returns list of products", (done) => {
        server.inject({
            method: "GET",
            url: "/product",
        }, (err, res) => {
            expect(res.statusCode).toBe(200);
            expect(dbMock.Product.find).toHaveBeenCalledWith();
            expect(JSON.parse(res.payload)[0]).toEqual(products[0]);
            done(err);
        });
    });
    test("Add Product POST /product", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield server.inject({
            method: "POST",
            url: "/product",
            payload: {
                _id: "5f2678dff22e1f4a3c9992ee",
                name: "Apple Headphone",
                category: "Electronic appliances",
                unit: 2,
            },
        });
        expect(res.statusCode).toBe(201);
        done();
    }));
    test("Update Product POST /product/:id", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield server.inject({
            method: "PUT",
            url: "/product/5f2678dff22e1f4a3c0782ee",
            payload: {
                unit: 2,
            },
        });
        expect(res.statusCode).toBe(200);
        done();
    }));
    test("DELETE /product/:id deletes a product", (done) => {
        const { _id } = products[0];
        server.inject({
            method: "DELETE",
            url: `/product/${_id}`,
        }, (err, res) => {
            expect(res.statusCode).toBe(200);
            expect(dbMock.Product.findOne).toHaveBeenCalledWith(_id);
            expect(dbMock.Product.remove).toHaveBeenCalledWith(products[0]);
            done(err);
        });
    });
});
//# sourceMappingURL=server.test.js.map