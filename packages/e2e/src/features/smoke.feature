@smoke
Feature: Application health

  Scenario: Host loads without Module Federation errors
    Given I open the application
    Then the home page is visible
    And no remote is in error

  Scenario: The detail page is accessible
    Given I open the application
    When I navigate to the detail page
    Then the media remote is loaded
