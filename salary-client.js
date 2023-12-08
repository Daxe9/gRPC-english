const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
// Definire il percorso del servizio
const PROTO_PATH = __dirname + "/salary.proto";

// Configurazione
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    // Preservare lo stile del case
    keepCase: true,
    // Specificare il formato dei valori numeri per evitare la perdita della precisione
    longs: String,
    // Indicare che i valori enum vanno rappresentati come stringhe
    enums: String,
    // Usare il valore di default se non è specificato
    defaults: true,
});

let paymentProto = grpc.loadPackageDefinition(packageDefinition).employee;

function main() {
    // Creare una connessione con il server su localhost porta 42069
    try {
        const client = new paymentProto.Employee("localhost:42069", grpc.credentials.createInsecure());
        let employeeIdList = [1, 2, 3];

        const response = client.paySalary({
            employeeIdList: employeeIdList
        })

        console.log(response);
    } catch (error) {
        console.error(error);    
    }
}

main();
