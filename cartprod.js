export default function showCartProd(input, stdout) {
    /*
    for(const s of input.sets) {
        stdout.debug('{', s, '}');
    }
    const lens = input.sets.map((s) => s.length);
    stdout.debug('lengths:', lens);
    */
    let tabData = extractTabular(input.sets);
    if(tabData !== undefined && stdout !== console) {
        tabularShowCartProd(stdout, tabData);
    }
    else {
        plainShowCartProd(input.sets, [], stdout);
    }
}

function extractTabular(sets) {
    let rowSet = undefined, colSet = undefined;
    const preList = [], inList = [], postList = [];
    for(const s of sets) {
        if(rowSet === undefined) {
            if(s.length === 1) {
                preList.push(s[0]);
            }
            else {
                rowSet = s;
            }
        }
        else if(colSet === undefined) {
            if(s.length === 1) {
                inList.push(s[0]);
            }
            else {
                colSet = s;
            }
        }
        else {
            if(s.length === 1) {
                postList.push(s[0]);
            }
            else {
                return undefined;
            }
        }
    }
    if(colSet === undefined) {
        return undefined;
    }
    else {
        return {
            rowSet: rowSet, colSet: colSet,
            prefix: preList.join(''), sep: inList.join(''), suffix: postList.join(''),
        };
    }
}

export function plainShowCartProd(sets, prefixList, stdout) {
    const n = sets.length;
    const m = prefixList.length;
    if(n == m) {
        stdout.log(prefixList.join(''));
    }
    else {
        const s = sets[m];
        for(const x of s) {
            prefixList.push(x);
            plainShowCartProd(sets, prefixList, stdout);
            prefixList.pop(x);
        }
    }
}

export function tabularShowCartProd(stdout, {prefix='', sep='', suffix='', rowSet, colSet}) {
    stdout.setLane('table', {'class': 'cpTable'});
    stdout.tableRow(['', ...colSet], true);
    for(const rowX of rowSet) {
        const trow = [rowX];
        for(const colX of colSet) {
            trow.push(prefix + rowX + sep + colX + suffix);
        }
        stdout.tableRow(trow);
    }
}
