var ipUtil = require('./');

describe('ip-util', () => {
    describe('isIpv4', () => {
        test('given a valid ipv4 string', () => {
            expect(ipUtil.isIpv4('49.38.152.18')).toBe(true);
        });
        test('given an invalid ipv4 string', () => {
            expect(ipUtil.isIpv4('15.98.32.256')).toBe(false);
        });
        test('given an ipv6 string', () => {
            expect(ipUtil.isIpv4('fc09::01')).toBe(false);
        });
    });
    describe('isIpv6', () => {
        test('given some valid ipv6 string', () => {
            expect(ipUtil.isIpv6('fc09::01')).toBe(true);
            expect(ipUtil.isIpv6('::01')).toBe(true);
            expect(ipUtil.isIpv6('fc09::')).toBe(true);
            expect(ipUtil.isIpv6('fc09:0000:0000:10:11:fa01:cd11:12')).toBe(true);
        });
        test('given some invalid ipv6 string', () => {
            expect(ipUtil.isIpv6('fc09::fc::12')).toBe(false);
            expect(ipUtil.isIpv6('127.0.0.1')).toBe(false);
        });
    });
    describe('isIpv4Range', () => {
        test('given some valid ipv4 range string', () => {
            expect(ipUtil.isIpv4Range('192.168.0.1-192.168.0.12')).toBe(true);
            expect(ipUtil.isIpv4Range('192.168.0.1-12')).toBe(true);
            expect(ipUtil.isIpv4Range('192.168.0.1-0.12')).toBe(true);
            expect(ipUtil.isIpv4Range('192.168.0.1-168.0.12')).toBe(true);
            expect(ipUtil.isIpv4Range('192.168.0.1/24')).toBe(true);
        });
        test('given some invalid ipv4 range string', () => {
            expect(ipUtil.isIpv4Range('192.168.0.1-256.15.16.32')).toBe(false);
            expect(ipUtil.isIpv4Range('192.168.0.1/33')).toBe(false);
        });
    });
    describe('isIpv6Range', () => {
        test('given some valid ipv6 range string', () => {
            expect(ipUtil.isIpv6Range('fc01::01-::02')).toBe(true);
            expect(ipUtil.isIpv6Range('fc01::01-fc02::02')).toBe(true);
        });
        test('given some invalid ipv6 range string', () => {
            expect(ipUtil.isIpv6Range('192.168.0.1-18.15.16.32')).toBe(false);
            expect(ipUtil.isIpv6Range('fc01::01/24')).toBe(false);
        });
    });
    describe('ipv4ToLong', () => {
        test('given some valid ipv4 string', () => {
            expect(ipUtil.ipv4ToLong('127.0.0.1')).toBe(2130706433);
            expect(ipUtil.ipv4ToLong('192.168.0.1')).toBe(-1062731775);
            expect(ipUtil.ipv4ToLong('106.24.98.109')).toBe(1779982957);
        });
        test('given some invalid ipv4 string', () => {
            expect(() => {
                ipUtil.ipv4ToLong('192.168.256.1')
            }).toThrowError();
        });
    });
    describe('checkInIpv4Range', () => {
        test('given some valid params', () => {
            expect(ipUtil.checkIpv4InRange('192.168.88.15', '192.168.88.1-20')).toBe(true);
            expect(ipUtil.checkIpv4InRange('192.168.88.15', '192.168.88.1-192.168.88.20')).toBe(true);
            expect(ipUtil.checkIpv4InRange('192.168.88.15', '192.168.87.1-88.20')).toBe(true);
        });
        test('given some invalid params', () => {
            expect(() => {
                ipUtil.checkIpv4InRange('192.168.256.1', '192.168.256.0-2')
            }).toThrowError();
            expect(() => {
                ipUtil.checkIpv4InRange('192.168.0.1', '192.168.256.1-55')
            }).toThrowError();
            expect(ipUtil.checkIpv4InRange('192.168.88.15', '192.168.88.17-20')).toBe(false);
            expect(ipUtil.checkIpv4InRange('192.168.88.15', '192.168.89.1-192.168.89.20')).toBe(false);
        });
    });
    describe('checkInIpv6Range', () => {
        test('given some valid params', () => {
            expect(ipUtil.checkIpv6InRange('fc01::01', 'fc01::-fc01::99')).toBe(true);
        });
        test('given some invalid params', () => {
            expect(() => {
                ipUtil.checkIpv6InRange('192.168.0.1', 'fc01::-fc99')
            }).toThrowError();
            expect(ipUtil.checkIpv6InRange('fc01::03', 'fc01::-fc01::02')).toBe(false);
        });
    });
    describe('expandIpv6', () => {
        test('given a compressed ipv6 string', () => {
            expect(ipUtil.expandIpv6('fc01::')).toBe('fc01:0000:0000:0000:0000:0000:0000:0000');
            expect(ipUtil.expandIpv6('fc01::02')).toBe('fc01:0000:0000:0000:0000:0000:0000:0002');
            expect(ipUtil.expandIpv6('fc01:8888::02')).toBe('fc01:8888:0000:0000:0000:0000:0000:0002');
        });
        test('given a invalid compressed ipv6 string', () => {
            expect(() => {
                ipUtil.expandIpv6('fc01::01::01')
            }).toThrowError();
        });
    });
    describe('expandIpv4Range', () => {
        test('given a valid ipv4 range', () => {
            expect(ipUtil.expandIpv4Range('192.168.0.1-14')).toBe('192.168.0.1-192.168.0.14');
        });
        test('given a invalid ipv4 range', () => {
            expect(() => {
                ipUtil.expandIpv4Range('192.168.0.1-256')
            }).toThrowError();
        });
    });
});