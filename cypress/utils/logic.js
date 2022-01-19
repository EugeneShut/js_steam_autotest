export function sortAndCompareArrays(array_of_elems) {
    const sorted = array_of_elems.slice().sort((a, b) => b - a);
    expect(array_of_elems, 'prices are sorted').to.deep.equal(sorted);
}