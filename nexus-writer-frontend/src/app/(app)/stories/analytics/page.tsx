/* 
This is where the analytics page for each story will go. 

What we need:

    1. A sidebar where users can select a story and see its dashboard
    2. The context menu from the dashboard should take them here
    3. We assemble the dashboard from kpi cards and a line chart
    4. The navbar should also take the user here

The Components we need:

    1. StoryListItem -> accepts the setter for selected story state. Like the ChapterListItem Component, make sure we use a ref to the latest setter to avoid infinite loops.
    2. StoryList -> Render a list of StoryListItem Components.
    3. AnalyticsDashboard -> Renders the dashboard. It consists of a filter bar, three kpi cards, and a bar chart. 
       If the story fetched from the storyId prop doesn't have a target it renders a modal form instead prompting the user
       for a target and its frequency
    4. TotalWordsCard -> KPI card for total words (should show if the user is above or below the target)
    5. TotalDurationCard -> KPI card for total time spent writing (maybe we can add new types of targets for time?)
    6. AverageWordsPerMinuteCard -> KPI Card for displaying average words per minute to measure consistency (maybe its helpful metric to see how focused a writer is)
    7. BarChart -> Displays writing output over time. Reacts to changes in the FilterBar component (well all dashboard components do). The target line should be visible and indicate
       how often and when the user is going above or below the target
    8. FilterBar -> Dynamic filter for dashboard. User can filter select different frequencies (daily, weekly, monthly), along with date ranges.
    9. CreateTargetForm -> Form where user can create, edit, or delete targets for a story. It is wrapped in a modal, and it gets triggered whenever a user clicks on a StoryListItem corresponding to a
       story with no target set. We need extensive error handling to stay in line with the backend. We need think about how we handle the create, edit, and delete states. Maybe a seperate form for each?
    10. AnalyticsContextMenu -> A context menu that appears when we right click a StoryListItem Component. It provides access to the Target Form Component and the options should be 
        Create Target, Update Target, Delete Target. Each option takes us to the appropriate modal form.

The hooks we will need:

    1. useStoryAnalytics -> uses react query to fetch analytics data from /stories/analytics/ in the backend. It should have everything we need for all dashboard components
    2. useSelectedStory -> very similar to useSelectedChapter. It will power selection for different story analytics dashboards.
    3. useTargets -> Will be essential for the CreateTargetForm Component
    4. useContextMenu -> This hook already exists but we will need to reuse it.
    5. useModal -> To manage the modal wrapper around CreateTargetForm
    6. useStories -> To fetch a user's stories and their titles.
*/
'use client'


export default function Page() {
    return (
        <div>
            <h1>Coming soon...</h1>
        </div>
    )
}