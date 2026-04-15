@a11y
Feature: Accessibility — Browse TV series with keyboard

  As a visually impaired user I can switch tabs using arrow keys,
  navigate to a TV series, and read its content.

  Background:
    Given I open the application
    Then the home page is visible

  @tv
  Scenario: Tab switching and TV detail page via keyboard
    Then the page should have no accessibility violations
    When I tab to the "Movies" tab in the "What's Popular" section
    And I press ArrowRight to switch to the next tab
    Then the "TV Shows" tab is active
    When I tab to the first poster in the active panel
    And I press Enter on the focused element
    Then the URL contains "/tv/"
    And the media remote is loaded
    And the hero section is visible
    And the synopsis section is visible
    And the cast section is visible
    And the page should have no accessibility violations
