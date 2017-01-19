

describe('Keypair.fromSecret', function() {

  it("creates a keypair correctly", function() {
    let secret = "SD7X7LEHBNMUIKQGKPARG5TDJNBHKC346OUARHGZL5ITC6IJPXHILY36";
    let kp = StellarBase.Keypair.fromSecret(secret);

    expect(kp).to.be.instanceof(StellarBase.Keypair);
    expect(kp.accountId()).to.eql("GDFQVQCYYB7GKCGSCUSIQYXTPLV5YJ3XWDMWGQMDNM4EAXAL7LITIBQ7");
    expect(kp.secret()).to.eql(secret);
  });

  it("throw an error if the arg isn't strkey encoded as a seed", function() {

    expect(() => StellarBase.Keypair.fromSecret("hel0")).to.throw()
    expect(() => StellarBase.Keypair.fromSecret("SBWUBZ3SIPLLF5CCXLWUB2Z6UBTYAW34KVXOLRQ5HDAZG4ZY7MHNBWJ1")).to.throw()
    expect(() => StellarBase.Keypair.fromSecret("masterpassphrasemasterpassphrase")).to.throw()
    expect(() => StellarBase.Keypair.fromSecret("gsYRSEQhTffqA9opPepAENCr2WG6z5iBHHubxxbRzWaHf8FBWcu")).to.throw()

  });

});

describe('Keypair.fromBase58Seed', function() {

  it("creates a keypair correctly", function() {
    let keys = [
      {
        oldSeed: 's3wpFU2RY8EyYRDKxhWNj3wJFBd4qHLKnaccXw9uGyYwrWVLDkB',
        newSeed: 'SCCMVPLGK4NLKPGGMYD4ANCC4VXMXKD7RTA24EIJ2Y6NMCCP5WJQ2TXB',
        newAddress: 'GDF7RAKSHWC5GKY2NRLYTZTBGFES5WX5Q6PRLX4VGH7X6TGLHLRPFIGD'
      },
      {
        oldSeed: 's3Gj77MCTCDGggmr3ExjjEMX814jCgWD4wZzjo6PiprPk7uKu6w',
        newSeed: 'SCJ7PY5AITP6NBXPEFSB52BH7JQYJ3GPAMXBMMT6ISY2VOSEXNNGVHHH',
        newAddress: 'GDBAERNWWNLSZCDHTKP34N7CJHE47IRK74WAY3ZHE33ERVLB2FNTM34J'
      },
      {
        oldSeed: 'sfYffC9uMbEoV3FiFZpnUrKyVLL89AT5QVpPsTpCFsz8w9oMbLw',
        newSeed: 'SAZS3RDL5QTPJSWARQ4MWLIKKXM446VKBBYXBXBUCXGKJCCH72TVUC6U',
        newAddress: 'GCIQKXYV3OLMYUU72C32LNC766TS5LY6O3MXPP5WY2XICB4G3OPYXRGP'
      },
      {
        oldSeed: 's37qzijJQNy7MqPQyZJY8zFmiEzszjpBVP9CZMXJJiPmmrxdPj8',
        newSeed: 'SCXXRH5QY6DAQOQNHMMF5PBKPB732US6QFNI7722VDRUCNJ5MNFDJJJL',
        newAddress: 'GAPVNVE4S2ZKPWYM6SWPVNNYPQUTBQXNKOSIPJ3LRQWJTREP5CDLXG2B'
      },
      {
        oldSeed: 's3StuXjYd8Hrgyy8WyG5aSRmDDebJZ2oTgPcGADbi4qRXThPBL4',
        newSeed: 'SCVQWNPUXGDRW2IOOM6SS5NQB4KK3Z2MH7ZMM4O6CXKX5L3NRZ5E6V2J',
        newAddress: 'GBNBJUKKTC4TZFB5QY5CXNC7UPOAYIW3DKWSSHJXXWKBDV7CZIFPBAMN'
      }
    ];


    for (let i in keys) {
      let key = keys[i];
      let keyPair = StellarBase.Keypair.fromBase58Seed(key.oldSeed);
      expect(keyPair.secret()).to.equal(key.newSeed);
      expect(keyPair.accountId()).to.equal(key.newAddress);
    }
  });

  it("throw an error if the arg isn't base58 encoded as a seed", function() {

    expect(() => StellarBase.Keypair.fromBase58Seed("hel0")).to.throw()
    expect(() => StellarBase.Keypair.fromBase58Seed("masterpassphrasemasterpassphrase")).to.throw()
    expect(() => StellarBase.Keypair.fromBase58Seed("gsYRSEQhTffqA9opPepAENCr2WG6z5iBHHubxxbRzWaHf8FBWcu")).to.throw()

  });

});

describe('Keypair.fromRawSeed', function() {

  it("creates a keypair correctly", function() {
    let seed = "masterpassphrasemasterpassphrase";
    let kp = StellarBase.Keypair.fromRawSeed(seed);

    expect(kp).to.be.instanceof(StellarBase.Keypair);
    expect(kp.accountId()).to.eql("GAXDYNIBA5E4DXR5TJN522RRYESFQ5UNUXHIPTFGVLLD5O5K552DF5ZH");
    expect(kp.secret()).to.eql("SBWWC43UMVZHAYLTONYGQ4TBONSW2YLTORSXE4DBONZXA2DSMFZWLP2R");
    expect(kp.rawPublicKey().toString("hex")).to.eql("2e3c35010749c1de3d9a5bdd6a31c12458768da5ce87cca6aad63ebbaaef7432");
  });

  it("throws an error if the arg isn't 32 bytes", function() {
    expect(() => StellarBase.Keypair.fromRawSeed("masterpassphrasemasterpassphras")).to.throw()
    expect(() => StellarBase.Keypair.fromRawSeed("masterpassphrasemasterpassphrase1")).to.throw()
    expect(() => StellarBase.Keypair.fromRawSeed(null)).to.throw()
    expect(() => StellarBase.Keypair.fromRawSeed()).to.throw()
  });

});


describe('Keypair.fromAccountId', function() {

  it("creates a keypair correctly", function() {
    let kp = StellarBase.Keypair.fromAccountId("GAXDYNIBA5E4DXR5TJN522RRYESFQ5UNUXHIPTFGVLLD5O5K552DF5ZH");
    expect(kp).to.be.instanceof(StellarBase.Keypair);
    expect(kp.accountId()).to.eql("GAXDYNIBA5E4DXR5TJN522RRYESFQ5UNUXHIPTFGVLLD5O5K552DF5ZH");
    expect(kp.rawPublicKey().toString("hex")).to.eql("2e3c35010749c1de3d9a5bdd6a31c12458768da5ce87cca6aad63ebbaaef7432");
  });

  it("throw an error if the arg isn't strkey encoded as a accountid", function() {
    expect(() => StellarBase.Keypair.fromAccountId("hel0")).to.throw()
    expect(() => StellarBase.Keypair.fromAccountId("masterpassphrasemasterpassphrase")).to.throw()
    expect(() => StellarBase.Keypair.fromAccountId("sfyjodTxbwLtRToZvi6yQ1KnpZriwTJ7n6nrASFR6goRviCU3Ff")).to.throw()
  });

  it("throws an error if the address isn't 32 bytes", function() {
    expect(() => StellarBase.Keypair.fromAccountId("masterpassphrasemasterpassphrase")).to.throw()
    expect(() => StellarBase.Keypair.fromAccountId("masterpassphrasemasterpassphrase")).to.throw()
    expect(() => StellarBase.Keypair.fromAccountId(null)).to.throw()
    expect(() => StellarBase.Keypair.fromAccountId()).to.throw()
  });

});


describe('Keypair.random', function() {

  it("creates a keypair correctly", function() {
    let kp = StellarBase.Keypair.random();
    expect(kp).to.be.instanceof(StellarBase.Keypair);
  });

});
