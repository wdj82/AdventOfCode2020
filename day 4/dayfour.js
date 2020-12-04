import input from './input.js';

const passports = input.split('\n\n');

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const validEcl = { amb: true, blu: true, brn: true, gry: true, grn: true, hzl: true, oth: true };

function isValidByr(byr) {
    if (byr >= 1920 && byr <= 2002) {
        return true;
    }
    return false;
}

function isValidIyr(iyr) {
    if (iyr >= 2010 && iyr <= 2020) {
        return true;
    }
    return false;
}

function isValidEyr(eyr) {
    if (eyr >= 2020 && eyr <= 2030) {
        return true;
    }
    return false;
}

function isValidHgt(hgt) {
    if (hgt.includes('cm')) {
        const cmHeight = hgt.slice(0, hgt.indexOf('cm'));
        if (cmHeight >= 150 && cmHeight <= 193) {
            return true;
        }
    } else if (hgt.includes('in')) {
        const inchHeight = hgt.slice(0, hgt.indexOf('in'));
        if (inchHeight >= 59 && inchHeight <= 76) {
            return true;
        }
    }
    return false;
}

function isValidHcl(hcl) {
    return /^#[a-f\d]{6,6}$/.test(hcl);
}

function isValidEcl(ecl) {
    return validEcl[ecl];
}

function isValidPid(pid) {
    return pid.length === 9 ? true : false;
}

function validateAllFields(passport) {
    if (!isValidByr(passport['byr'])) {
        return false;
    }

    if (!isValidIyr(passport['iyr'])) {
        return false;
    }

    if (!isValidEyr(passport['eyr'])) {
        return false;
    }

    if (!isValidHgt(passport['hgt'])) {
        return false;
    }

    if (!isValidHcl(passport['hcl'])) {
        return false;
    }

    if (!isValidEcl(passport['ecl'])) {
        return false;
    }

    if (!isValidPid(passport['pid'])) {
        return false;
    }
    return true;
}

function isValidFields(passport) {
    return requiredFields.every((requiredField) => passport[requiredField]);
}

function isValidPassport(rawPassport) {
    const pairs = rawPassport.replace(/\n/g, ' ').split(' ');
    const passport = {};
    pairs.forEach((pair) => {
        const [key, value] = pair.split(':');
        passport[key] = value;
    });

    //can just return isValidFields for part one
    return isValidFields(passport) && validateAllFields(passport);
}

function getNumValidPassports(passports) {
    return passports.reduce((totalValidated, passport) => {
        if (isValidPassport(passport)) {
            totalValidated += 1;
        }
        return totalValidated;
    }, 0);
}

console.log(getNumValidPassports(passports));
