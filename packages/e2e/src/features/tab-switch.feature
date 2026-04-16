@e2e
Feature: Tab switching in sections

  As a visitor I can switch between tabs in sectioned content
  and see the correct content for each tab.

  Background:
    Given I open the application
    Then the home page is visible

  @home @tabs
  Scenario: Switching tabs in the Popular section loads different content
    When I click the "TV Shows" tab in the "What's Popular" section
    Then the "TV Shows" tab is active in the "What's Popular" section
    And I see posters in the active panel
    When I click the "TV Shows" tab in the "Free To Watch" section
    Then the "TV Shows" tab is active in the "Free To Watch" section
    And I see posters in the active panel
