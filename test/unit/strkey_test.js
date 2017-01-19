var keypair          = StellarBase.Keypair.master();
let unencodedBuffer  = keypair.rawPublicKey();
let unencoded        = unencodedBuffer.toString();
let accountIdEncoded = keypair.accountId();
let seedEncoded      = StellarBase.StrKey.encodeSeed(unencodedBuffer);

describe('StrKey#decodeCheck', function() {

  it("decodes correctly", function() {
    expect(StellarBase.StrKey.decodePublicKey(accountIdEncoded)).to.eql(unencodedBuffer);
    expect(StellarBase.StrKey.decodeSeed(seedEncoded)).to.eql(unencodedBuffer);
  });

  it("throws an error when the version byte is wrong", function() {
    expect(() => StellarBase.StrKey.decodeSeed("GBPXXOA5N4JYPESHAADMQKBPWZWQDQ64ZV6ZL2S3LAGW4SY7NTCMWIVL")).to.throw(/invalid version/);
    expect(() => StellarBase.StrKey.decodePublicKey("SBGWKM3CD4IL47QN6X54N6Y33T3JDNVI6AIJ6CD5IM47HG3IG4O36XCU")).to.throw(/invalid version/);
  });

  it("throws an error when decoded data encodes to other string", function() {
    // accountId
    expect(() => StellarBase.StrKey.decodePublicKey("GBPXX0A5N4JYPESHAADMQKBPWZWQDQ64ZV6ZL2S3LAGW4SY7NTCMWIVL")).to.throw(/invalid encoded string/);
    expect(() => StellarBase.StrKey.decodePublicKey("GCFZB6L25D26RQFDWSSBDEYQ32JHLRMTT44ZYE3DZQUTYOL7WY43PLBG++")).to.throw(/invalid encoded string/);
    expect(() => StellarBase.StrKey.decodePublicKey("GADE5QJ2TY7S5ZB65Q43DFGWYWCPHIYDJ2326KZGAGBN7AE5UY6JVDRRA")).to.throw(/invalid encoded string/);
    expect(() => StellarBase.StrKey.decodePublicKey("GB6OWYST45X57HCJY5XWOHDEBULB6XUROWPIKW77L5DSNANBEQGUPADT2")).to.throw(/invalid encoded string/);
    expect(() => StellarBase.StrKey.decodePublicKey("GB6OWYST45X57HCJY5XWOHDEBULB6XUROWPIKW77L5DSNANBEQGUPADT2T")).to.throw(/invalid encoded string/);
    // seed
    expect(() => StellarBase.StrKey.decodeSeed("SB7OJNF5727F3RJUG5ASQJ3LUM44ELLNKW35ZZQDHMVUUQNGYW")).to.throw(/invalid encoded string/);
    expect(() => StellarBase.StrKey.decodeSeed("SB7OJNF5727F3RJUG5ASQJ3LUM44ELLNKW35ZZQDHMVUUQNGYWMEGB2W2")).to.throw(/invalid encoded string/);
    expect(() => StellarBase.StrKey.decodeSeed("SB7OJNF5727F3RJUG5ASQJ3LUM44ELLNKW35ZZQDHMVUUQNGYWMEGB2W2T")).to.throw(/invalid encoded string/);
    expect(() => StellarBase.StrKey.decodeSeed("SCMB30FQCIQAWZ4WQTS6SVK37LGMAFJGXOZIHTH2PY6EXLP37G46H6DT")).to.throw(/invalid encoded string/);
    expect(() => StellarBase.StrKey.decodeSeed("SAYC2LQ322EEHZYWNSKBEW6N66IRTDREEBUXXU5HPVZGMAXKLIZNM45H++")).to.throw(/invalid encoded string/);
  });

  it("throws an error when the checksum is wrong", function() {
    expect(() => StellarBase.StrKey.decodePublicKey("GBPXXOA5N4JYPESHAADMQKBPWZWQDQ64ZV6ZL2S3LAGW4SY7NTCMWIVT")).to.throw(/invalid checksum/);
    expect(() => StellarBase.StrKey.decodeSeed("SBGWKM3CD4IL47QN6X54N6Y33T3JDNVI6AIJ6CD5IM47HG3IG4O36XCX")).to.throw(/invalid checksum/);
  });
});


describe('StrKey#encodeCheck', function() {

  it("encodes a buffer correctly", function() {
    expect(StellarBase.StrKey.encodePublicKey(unencodedBuffer)).to.eql(accountIdEncoded);
    expect(StellarBase.StrKey.encodePublicKey(unencodedBuffer)).to.match(/^G/);
    expect(StellarBase.StrKey.encodeSeed(unencodedBuffer)).to.eql(seedEncoded);
    expect(StellarBase.StrKey.encodeSeed(unencodedBuffer)).to.match(/^S/);

    expect(StellarBase.StrKey.encodeHashTx(unencodedBuffer)).to.match(/^T/);
    expect(StellarBase.StrKey.encodeHashX(unencodedBuffer)).to.match(/^X/);
  });

  it("encodes a buffer correctly", function() {
    expect(StellarBase.StrKey.encodePublicKey(unencodedBuffer)).to.eql(accountIdEncoded);
    expect(StellarBase.StrKey.encodeSeed(unencodedBuffer)).to.eql(seedEncoded);
  });


  it("throws an error when the data is null", function() {
    expect(() => StellarBase.StrKey.encodeSeed(null)).to.throw(/null data/);
    expect(() => StellarBase.StrKey.encodePublicKey(null)).to.throw(/null data/);
  });
});

describe('StrKey.isValidPublicKey', function() {

  it("returns true for valid public key", function() {
    var keys = [
      'GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB',
      'GB7KKHHVYLDIZEKYJPAJUOTBE5E3NJAXPSDZK7O6O44WR3EBRO5HRPVT',
      'GD6WVYRVID442Y4JVWFWKWCZKB45UGHJAABBJRS22TUSTWGJYXIUR7N2',
      'GBCG42WTVWPO4Q6OZCYI3D6ZSTFSJIXIS6INCIUF23L6VN3ADE4337AP',
      'GDFX463YPLCO2EY7NGFMI7SXWWDQAMASGYZXCG2LATOF3PP5NQIUKBPT',
      'GBXEODUMM3SJ3QSX2VYUWFU3NRP7BQRC2ERWS7E2LZXDJXL2N66ZQ5PT',
      'GAJHORKJKDDEPYCD6URDFODV7CVLJ5AAOJKR6PG2VQOLWFQOF3X7XLOG',
      'GACXQEAXYBEZLBMQ2XETOBRO4P66FZAJENDHOQRYPUIXZIIXLKMZEXBJ',
      'GDD3XRXU3G4DXHVRUDH7LJM4CD4PDZTVP4QHOO4Q6DELKXUATR657OZV',
      'GDTYVCTAUQVPKEDZIBWEJGKBQHB4UGGXI2SXXUEW7LXMD4B7MK37CWLJ'
    ];

    for (var i in keys) {
      expect(StellarBase.StrKey.isValidPublicKey(keys[i])).to.be.true;
    }
  });

  it("returns false for invalid public key", function() {
    var keys = [
      'GBPXX0A5N4JYPESHAADMQKBPWZWQDQ64ZV6ZL2S3LAGW4SY7NTCMWIVL',
      'GCFZB6L25D26RQFDWSSBDEYQ32JHLRMTT44ZYE3DZQUTYOL7WY43PLBG++',
      'GADE5QJ2TY7S5ZB65Q43DFGWYWCPHIYDJ2326KZGAGBN7AE5UY6JVDRRA',
      'GB6OWYST45X57HCJY5XWOHDEBULB6XUROWPIKW77L5DSNANBEQGUPADT2',
      'GB6OWYST45X57HCJY5XWOHDEBULB6XUROWPIKW77L5DSNANBEQGUPADT2T',
      'GDXIIZTKTLVYCBHURXL2UPMTYXOVNI7BRAEFQCP6EZCY4JLKY4VKFNLT',
      'SAB5556L5AN5KSR5WF7UOEFDCIODEWEO7H2UR4S5R62DFTQOGLKOVZDY',
      'gWRYUerEKuz53tstxEuR3NCkiQDcV4wzFHmvLnZmj7PUqxW2wt',
      'test',
      null,
      'g4VPBPrHZkfE8CsjuG2S4yBQNd455UWmk' // Old network key
    ];

    for (var i in keys) {
      expect(StellarBase.StrKey.isValidPublicKey(keys[i])).to.be.false;
    }
  });

});

describe('StrKey.isValidSecretKey', function() {

  it("returns true for valid secret key", function() {
    var keys = [
      'SAB5556L5AN5KSR5WF7UOEFDCIODEWEO7H2UR4S5R62DFTQOGLKOVZDY',
      'SCZTUEKSEH2VYZQC6VLOTOM4ZDLMAGV4LUMH4AASZ4ORF27V2X64F2S2',
      'SCGNLQKTZ4XCDUGVIADRVOD4DEVNYZ5A7PGLIIZQGH7QEHK6DYODTFEH',
      'SDH6R7PMU4WIUEXSM66LFE4JCUHGYRTLTOXVUV5GUEPITQEO3INRLHER',
      'SC2RDTRNSHXJNCWEUVO7VGUSPNRAWFCQDPP6BGN4JFMWDSEZBRAPANYW',
      'SCEMFYOSFZ5MUXDKTLZ2GC5RTOJO6FGTAJCF3CCPZXSLXA2GX6QUYOA7'
    ];

    for (var i in keys) {
      expect(StellarBase.StrKey.isValidSecretKey(keys[i])).to.be.true;
    }
  });

  it("returns false for invalid secret key", function() {
    var keys = [
      'GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB',
      'SAB5556L5AN5KSR5WF7UOEFDCIODEWEO7H2UR4S5R62DFTQOGLKOVZDYT', // Too long
      'SAFGAMN5Z6IHVI3IVEPIILS7ITZDYSCEPLN4FN5Z3IY63DRH4CIYEV', // To short
      'SAFGAMN5Z6IHVI3IVEPIILS7ITZDYSCEPLN4FN5Z3IY63DRH4CIYEVIT', // Checksum
      'test',
      null
    ];

    for (var i in keys) {
      expect(StellarBase.StrKey.isValidSecretKey(keys[i])).to.be.false;
    }
  });

});
