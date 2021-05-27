import { SafeEthersSigner, SafeService } from '../src/signer'
import dotenv from 'dotenv'
import { Wallet } from '@ethersproject/wallet'
import { JsonRpcProvider } from '@ethersproject/providers'

dotenv.config()

const sample = async () => {
    console.log("Setup provider")
    const provider = new JsonRpcProvider(process.env.JSON_RPC!!)
    console.log("Setup SafeServices")
    const service = new SafeService(process.env.SERVICE_URL!!)
    console.log("Setup Signer")
    const signer = new Wallet(process.env.SIGNER_KEY!!, provider)
    console.log("Setup SafeEthersSigner")
    const safe = await SafeEthersSigner.create(process.env.DEPLOYER_SAFE!!, signer, service, provider)
    const proposedTx = await safe.sendTransaction({
        value: 1,
        data: "0x60a06040523373ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b8152505060805160601c6104d3610059600039600061014301526104d36000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063512dc43a1461005157806367e404ce1461006d578063d5f394881461008b578063e21f37ce146100a9575b600080fd5b61006b600480360381019061006691906102e0565b6100c7565b005b61007561011d565b604051610082919061036d565b60405180910390f35b610093610141565b6040516100a0919061036d565b60405180910390f35b6100b1610165565b6040516100be9190610388565b60405180910390f35b8181600191906100d89291906101f3565b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b7f000000000000000000000000000000000000000000000000000000000000000081565b600180546101729061042b565b80601f016020809104026020016040519081016040528092919081815260200182805461019e9061042b565b80156101eb5780601f106101c0576101008083540402835291602001916101eb565b820191906000526020600020905b8154815290600101906020018083116101ce57829003601f168201915b505050505081565b8280546101ff9061042b565b90600052602060002090601f0160209004810192826102215760008555610268565b82601f1061023a57803560ff1916838001178555610268565b82800160010185558215610268579182015b8281111561026757823582559160200191906001019061024c565b5b5090506102759190610279565b5090565b5b8082111561029257600081600090555060010161027a565b5090565b60008083601f8401126102a857600080fd5b8235905067ffffffffffffffff8111156102c157600080fd5b6020830191508360018202830111156102d957600080fd5b9250929050565b600080602083850312156102f357600080fd5b600083013567ffffffffffffffff81111561030d57600080fd5b61031985828601610296565b92509250509250929050565b61032e816103c6565b82525050565b600061033f826103aa565b61034981856103b5565b93506103598185602086016103f8565b6103628161048c565b840191505092915050565b60006020820190506103826000830184610325565b92915050565b600060208201905081810360008301526103a28184610334565b905092915050565b600081519050919050565b600082825260208201905092915050565b60006103d1826103d8565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60005b838110156104165780820151818401526020810190506103fb565b83811115610425576000848401525b50505050565b6000600282049050600182168061044357607f821691505b602082108114156104575761045661045d565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f830116905091905056fea2646970667358221220c0c87f3de787f52788662506f777af15f25e51de07801185a9391eb98ca5677b64736f6c63430008040033"
    })
    console.log("USER ACTION REQUIRED")
    console.log("Go to the Gnosis Safe Web App to confirm the transcation")
    console.log(await proposedTx.wait())
    console.log("Transaction has been executed")
}

sample() 