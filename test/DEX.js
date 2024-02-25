const { expect } = require('chai')

describe('DEX', function () {
  const totalSupply = 100
  const price = 10
  let token, dex

  beforeEach(async () => {
    let [owner, addr1, addr2] = await ethers.getSigners()

    // Deploy Token contract
    const Token = await ethers.getContractFactory('Token')
    token = await Token.deploy(totalSupply); // Mint 100 eth to the owner

    // Deploy DEX contract
    const DEX = await ethers.getContractFactory('DEX')
    dex = await DEX.deploy(token, price); // Pass the Token address and an initial price
  })

  describe('Deployment', () => {
    it('should deploy the smart contract', async () => {
      const [name, symbol] = await Promise.all([
        token.name(), token.symbol()
      ])

      expect(name).to.be.equal('BiaCoin')
      expect(symbol).to.be.equal('BIA')
      expect(token.target).to.be.equal('0x5FbDB2315678afecb367f032d93F642f64180aa3')
      expect(token.runner.address).to.be.equal('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
    })

    it('should withdraw tokens from the DEX balance to the caller', async () => {

    })
  })

  describe('Getters', () => {
    it('should return the token balance', async () => {
      expect(await dex.getTokenBalance()).to.be.equal(0)
    })

    it('should return the price token', async () => {
      const numTokens = 2;
      const tokenPrice = await dex.getPrice(numTokens);
      expect(parseInt(tokenPrice)).to.be.equal(price*numTokens);
    })

    it('should return the owner of DEX smart contract', async () => {
      const owner = await dex.owner()
      expect(owner).to.be.properAddress
      expect(owner).to.be.equal('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
    })
  })

  /* describe('Sell', () => {
    it('Should fail if contract is not approved', async () => {
      await expect(dex.sell).to.be.reverted;
    });
  }); */

})
