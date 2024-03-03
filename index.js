const Web3 = require('web3');

class Web3Tools {
    constructor(providerUrl, timeout = 10000) {
        this.web3 = new Web3(providerUrl, { timeout });
    }

    async getBlockInfo(blockNumber) {
        try {
            const block = await this.web3.eth.getBlock(blockNumber);
            return block;
        } catch (error) {
            console.error('Error fetching block information:', error);
            throw error;
        }
    }

    async getTransactionReceipt(txHash) {
        try {
            const receipt = await this.web3.eth.getTransactionReceipt(txHash);
            return receipt;
        } catch (error) {
            console.error('Error fetching transaction receipt:', error);
            throw error;
        }
    }

    async estimateGas(transactionObject) {
        try {
            const gas = await this.web3.eth.estimateGas(transactionObject);
            return gas;
        } catch (error) {
            console.error('Error estimating gas:', error);
            throw error;
        }
    }

    async deployContract(abi, bytecode, from, gas) {
        try {
            const contract = new this.web3.eth.Contract(abi);
            const deployment = contract.deploy({ data: bytecode });
            const transaction = deployment.send({ from, gas });
            const deployedContract = await transaction;
            return deployedContract;
        } catch (error) {
            console.error('Error deploying contract:', error);
            throw error;
        }
    }
}

module.exports = Web3Tools;