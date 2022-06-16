const chai = window.chai
const expect = chai.expect


describe('Replace special characters', () => { // Unit Test to make sure that the Value replacement function is working
    it('should convert ?, *, /, \ to their respective code in order to fetch the API', () => {
      expect(check('?')).to.deep.equal('%253F')
      expect(check('*')).to.deep.equal('%252A')
      expect(check('/')).to.deep.equal('%252F')
      expect(check('\\')).to.deep.equal('%27C')
    })
  })

  

