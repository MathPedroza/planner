const { spawn } = require('child_process');
const path = require('path');

const services = [
    {
        name: 'API Gateway',
        path: './server/gateway',
        color: 'yellow'
    },
    {
        name: 'Serviço de Lembretes',
        path: './server/lembretes-service',
        color: 'green'
    },
    {
        name: 'Serviço de Consulta',
        path: './server/consulta-service',
        color: 'blue'
    },
    {
        name: 'Serviço de Atualização',
        path: './server/atualizacao-service',
        color: 'magenta'
    }
];

const colors = {
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    reset: '\x1b[0m'
};

function startService(service) {
    const serviceProcess = spawn('npm', ['start'], {
        cwd: path.resolve(__dirname, service.path),
        shell: true
    });

    console.log(`${colors[service.color]}[${service.name}] Iniciando...${colors.reset}`);

    serviceProcess.stdout.on('data', (data) => {
        console.log(`${colors[service.color]}[${service.name}] ${data.toString().trim()}${colors.reset}`);
    });

    serviceProcess.stderr.on('data', (data) => {
        console.error(`${colors[service.color]}[${service.name}] Erro: ${data.toString().trim()}${colors.reset}`);
    });

    serviceProcess.on('close', (code) => {
        console.log(`${colors[service.color]}[${service.name}] Processo finalizado com código ${code}${colors.reset}`);
    });

    return serviceProcess;
}

console.log('Iniciando todos os microserviços...');

// Inicia todos os serviços
const processes = services.map(service => startService(service));

// Gerencia o encerramento gracioso
process.on('SIGINT', () => {
    console.log('\nEncerrando todos os serviços...');
    processes.forEach(proc => proc.kill());
    process.exit(0);
});