@a11y
Feature: Accessibility — Search and browse with keyboard

  As a visually impaired user I can search for a movie using the
  typeahead with keyboard navigation, land on its detail page,
  and browse photos — all without a mouse.

  Background:
    Given I open the application
    Then the home page is visible

  @search
  Scenario: Typeahead keyboard navigation and photo browsing
    When I tab to the search input
    And I type "incep" using the keyboard
    And I wait for search results to appear
    Then the page should have no accessibility violations
    When I press ArrowDown to highlight the first result
    And I press ArrowDown until "Inception" is highlighted
    And I press Enter on the focused element
    Then I am on the movie page for "Inception"
    And the page should have no accessibility violations
    When I click on a photo in the photos section
    Then the photo viewer is open
    And the "photo viewer" should have no accessibility violations
    When I tab to the button labeled "Next"
    And I press Enter on the focused element
    Then the photo viewer is open
    When I tab to the button labeled "Previous"
    And I press Enter on the focused element
    Then the photo viewer is open
    When I press Escape
    Then I am on the movie page for "Inception"
