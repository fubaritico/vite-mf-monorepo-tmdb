@a11y
Feature: Accessibility — Search results page with keyboard

  As a visually impaired user I can submit a search via keyboard,
  navigate the results page, refine my search, and open a movie.

  Background:
    Given I open the application
    Then the home page is visible

  @search
  Scenario: Search results page keyboard navigation
    When I tab to the search input
    And I type "deep" using the keyboard
    And I wait for search results to appear
    And I press Enter on the focused element
    Then I am on the search results page for "deep"
    And the page should have no accessibility violations
    And I see the heading "deep"
    And I see the section "Movies"
    When I tab to the search bar input on the results page
    And I clear and type "gladiator" using the keyboard
    And I press Enter on the focused element
    Then I am on the search results page for "gladiator"
    And the page should have no accessibility violations
    And "Gladiator" is in the "Movies" section
    When I tab to "Gladiator" in the results
    And I press Enter on the focused element
    Then I am on the movie page for "Gladiator"
    And the page should have no accessibility violations
