require ('../swagger.js');

const swaggerAutogen = require("swagger-autogen")();

jest.mock("swagger-autogen", () => () => jest.fn());

describe("Swagger Autogen", () => {
    it("should call swaggerAutogen with correct parameters", () => {
        const outputfile = "./swagger.json";
        const endpointsFiles = ["./routes/index.js"];
        const doc = {
            info: {
                title: "Gradebook Api",
                description: "Gradebook Api"
            },
            host: "localhost:3000",
            schemes: ["https", "http"]
        };

        swaggerAutogen(outputfile, endpointsFiles, doc);

        expect(swaggerAutogen).toHaveBeenCalledTimes(1);
        expect(swaggerAutogen).toHaveBeenCalledWith(outputfile, endpointsFiles, doc);
    });
});
