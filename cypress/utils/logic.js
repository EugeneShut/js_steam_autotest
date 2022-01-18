export function sortPrices(prices) {
    const array_of_elems = Array.from(prices, spanElement => spanElement.innerText);
    const sorted = array_of_elems.slice().sort((a, b) => b - a);
    expect(array_of_elems, 'prices are sorted').to.deep.equal(sorted);
}