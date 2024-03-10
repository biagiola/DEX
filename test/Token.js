const  { expect } = require('chai');

describe('Token Contract', () => {
  let owner, addr1, addr2, token;

  before(async () => {
    [owner, addr1, addr2] = await ethers.getSigners()
    const Token = await ethers.getContractFactory('Token')
    token = await Token.deploy(1000)
  })

  describe('Deployment', () => {
    it('Should assign total supply of tokens to the owner/deployer', async () => {
      const ownerBalance = await token.balanceOf(owner.address)
      const totalSupply = await token.totalSupply()

      expect(totalSupply).to.equal(ownerBalance)
    })
  })

  describe('Transactions', () => {
    it('Should transfer tokens between accounts', async () => {
      const amount = 50
      await token.transfer(addr1.address, amount)

      const addr1Balance = await token.balanceOf(addr1.address)

      expect(addr1Balance).to.equal(amount)
    })

    it('Should transfer tokens between accounts', async () => {
      // addr1 already has 50 from the previous test
      // await token.connect(addr1.address).transfer(addr2.address, 50)
      
      const addr2balance = await token.balanceOf(addr2.address)
      // expect(addr2balance).to.equal(50)
      await expect(token.connect(addr1).transfer(addr2.address, 51)).to.be.reverted;
    })
  })
})

