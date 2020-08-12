'use strict';

var ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/;
var ipv4RangeRegex = /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(\/(\d|[12]\d|3[0-2])|-((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){0,3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]+|::(ffff(:0{1,4})?:)?((25[0-5]|(2[0-4]|1?[0-9])?[0-9])\.){3}(25[0-5]|(2[0-4]|1?[0-9])?[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1?[0-9])?[0-9])\.){3}(25[0-5]|(2[0-4]|1?[0-9])?[0-9]))$/;
var ipv6RangeRegex = /^((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:)(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))-((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:)(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/;

function InvalidIpError(message) {
    this.message = message;
    this.name = 'InvalidIpError';
}
InvalidIpError.prototype = Object.create(Error.prototype);
InvalidIpError.constructor = InvalidIpError;

var padLeft = (str, length, char) => {
    for (let i = 0; i < length; i++) {
        str = `${char}${str}`;
    }
    return str;
};

var getIpv4Mask = (bits) => {
    var fillBitsFromLeft = (bits) => {
        if (bits >= 8) {
            return 255;
        }
        var pad = 0xff00;
        while (bits > 0) {
            pad = pad >> 1;
            bits--;
        }
        return pad & 0xff;
    };

    var mask = [];
    for (var i = 0; i < 3; i++) {
        if (bits >= 8) {
            mask.push(255);
            bits -= 8;
        } else {
            mask.push(fillBitsFromLeft(bits));
            for (var j = 0; j < 4 - mask.length; j++) {
                mask.push(0);
            }
            return mask;
        }
    }
    mask.push = fillBitsFromLeft(bits);
    return mask;
}

var exports = {};

exports.isIpv4 = function isIpv4(value) {
    return ipv4Regex.test(value);
}

exports.isIpv6 = function isIpv6(value) {
    return ipv6Regex.test(value);
}

exports.isIpv4Range = function isIpv4Range(value) {
    return ipv4RangeRegex.test(value);
}

exports.isIpv6Range = function isIpv6Range(value) {
    return ipv6RangeRegex.test(value);
}

exports.ipv4ToLong = function ipv4ToLong(ipv4) {
    if (!this.isIpv4(ipv4)) {
        throw new InvalidIpError(`${ipv4} is not a valid ipv4 string`);
    }
    var result = 0;
    var list = ipv4.split('.');
    for (var i = 0; i < list.length; i++) {
        result += list[i] * Math.pow(256, list.length - i - 1);
    }
    return result << 0;
}

exports.checkIpv4InRange = function checkIpv4InRange(ip, range) {

    if (!this.isIpv4(ip)) {
        throw new InvalidIpError(`${ip} is not a valid ipv4 string`);
    }
    if (!this.isIpv4Range(range)) {
        throw new InvalidIpError(`${range} is not a valid ipv4 range string`);
    }

    range = this.expandIpv4Range(range).split('-');
    var start = this.ipv4ToLong(range[0]);
    var end = this.ipv4ToLong(range[1]);
    var min = Math.min(start, end);
    var max = Math.max(start, end);
    var ipLong = this.ipv4ToLong(ip);
    return ipLong >= min && ipLong <= max;
}

exports.checkIpv6InRange = function checkIpv6InRange(ip, range) {

    if (!this.isIpv6(ip)) {
        throw new InvalidIpError(`${ip} is not a valid ipv6 string`);
    }
    if (!this.isIpv6Range(range)) {
        throw new InvalidIpError(`${range} is not a valid ipv6 range string`);
    }
    range = range.split('-');
    var start = this.expandIpv6(range[0]);
    var end = this.expandIpv6(range[1]);
    if (start > end) {
        var tmp = end;
        end = start;
        start = tmp;
    }
    ip = this.expandIpv6(ip);
    return ip >= start && ip <= end;
}

exports.expandIpv6 = function expandIpv6(ip) {
    if (!this.isIpv6(ip)) {
        throw new InvalidIpError(`${ip} is not a valid ipv6 string`);
    }
    var list = ip.split(':');

    var blankIndex = list.indexOf('');
    if (blankIndex > -1) {
        var left = list.slice(0, blankIndex);
        var right = list.slice(blankIndex + 1, list.length);
        var middle = [];
        for (var i = 0; i < 8 - list.length + 1; i++) {
            middle.push('0000');
        }
        list = left.concat(middle, right);
    }

    for (var i = 0; i < list.length; i++) {
        list[i] = padLeft(list[i], 4 - list[i].length, '0');
    }
    return list.join(':');
}

exports.expandIpv4Range = function expandIpv4Range(ipRange) {
    if (!this.isIpv4Range(ipRange)) {
        throw new InvalidIpError(`${ipRange} is not a valid ipv4 range string`);
    }
    if (ipRange.indexOf('/') < 0) {
        var list = ipRange.split('-');
        if (!this.isIpv4(list[0])) {
            return false;
        }
        if (!this.isIpv4(list[1])) {
            list[1] = list[1].split('.');
            list[1] = list[0].split('.')
                .slice(0, 4 - list[1].length)
                .concat(list[1])
                .join('.');
        }
        return list.join('-');
    }
    var list = ipRange.split('/');
    var bits = parseInt(list[1], 10);
    var ip = list[0].split('.');
    var netMask = getIpv4Mask(bits);
    var startIp = [];
    var endIp = [];
    if (bits === 31) {
        for (var i = 0; i < 4; i++) {
            startIp.push(ip[i] & netMask[i]);
            endIp.push(ip[i] | (~netMask[i] & 0xff));
        }
    } else if (bits === 32) {
        for (var i = 0; i < 4; i++) {
            startIp.push(ip[i]);
            endIp.push(ip[i]);
        }
    } else {
        for (var i = 0; i < 4; i++) {
            if (i > 2) {
                startIp.push((ip[i] & netMask[i]) + 1);
                endIp.push((ip[i] | (~netMask[i] & 0xff)) - 1);
            } else {
                startIp.push(ip[i] & netMask[i]);
                endIp.push(ip[i] | (~netMask[i] & 0xff));
            }
        }
    }
    return `${startIp.join('.')}-${endIp.join('.')}`;
}

module.exports = exports;
