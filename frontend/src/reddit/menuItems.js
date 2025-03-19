Devvit.addMenuItem({
  location: 'subreddit',
  label: 'Share IceBerg Results',
  onPress: async (_, context) => {
    const currentSubreddit = await context.reddit.getCurrentSubreddit();
    await context.reddit.submitPost({
      title: 'IceBerg Game Results',
      subredditName: currentSubreddit.name,
      preview: (
        <vstack>
          <text>Loading game results...</text>
        </vstack>
      ),
    });
  },
}); 