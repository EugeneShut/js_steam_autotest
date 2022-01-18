// https://wiki.a1qa.com/pages/viewpage.action?pageId=681093258

const { _ } = Cypress

describe('Steam TS', () => {
    const DEFAULT_TIMEOUT = 10000
    const HOST = 'https://store.steampowered.com'
    const SEARCH_RESULT = HOST + '/search/results?**'
    const STEAM_SHOP = '#global_header > div > div.supernav_container > a[data-tooltip-content=".submenu_store"]'
    const STEAM_SEARCH = '#store_nav_search_term'
    const STEAM_SHOP_SUGGESTIONS = '#search_suggestion_contents'
    const STEAM_SHOP_SEARCH_BUTTON = '#store_search_link > img'
    const STEAM_SHOP_RESULT_ROW = '#search_resultsRows'
    const STEAM_SHOP_RESULT_ROW_FILTER = '#sort_by_trigger'
    const STEAM_SHOP_FILTER_BY_DESC = '#Price_DESC'
    const STEAM_SHOP_ITEM_PRICE = 'div.col.search_price.responsive_secondrow'

    const parametrization = [
        {"game": "The Witcher", "items": 10},
        {"game": "Fallout", "items": 20}
    ]
    parametrization.forEach((param) => {
        it('Steam TC', () => {
            cy.visit(HOST)
            cy.get(STEAM_SHOP)

            cy.get(STEAM_SEARCH).type(param.game)
            cy.get(STEAM_SHOP_SUGGESTIONS, {timeout: DEFAULT_TIMEOUT}).should('be.visible')
            cy.get(STEAM_SHOP_SEARCH_BUTTON).click()
            cy.get(STEAM_SHOP_RESULT_ROW).find('a').should('not.be.empty')

            cy.intercept({method: "GET", url: SEARCH_RESULT,}).as("getSearch")
            cy.get(STEAM_SHOP_RESULT_ROW_FILTER, {timeout: DEFAULT_TIMEOUT}).click()
            cy.get(STEAM_SHOP_FILTER_BY_DESC, {timeout: DEFAULT_TIMEOUT}).click()
            cy.wait("@getSearch")

            cy.get(STEAM_SHOP_RESULT_ROW + " > a:nth-child(-n+"+ param.items +")", {timeout: DEFAULT_TIMEOUT})
                .find(STEAM_SHOP_ITEM_PRICE).then((prices) => {
                    const array_of_elems = Array.from(prices, spanElement => spanElement.innerText);
                    const sorted = array_of_elems.slice().sort((a,b)=>b-a)
                    expect(array_of_elems, 'prices are sorted').to.deep.equal(sorted)
                })
            })
        })
    })
