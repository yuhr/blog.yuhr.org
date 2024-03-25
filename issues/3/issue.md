---
active_lock_reason: 
assignee: 
assignees: []
author_association: OWNER
closed_at: '2023-06-09T08:29:04Z'
comments: 0
comments_url: https://api.github.com/repos/yuhr/blog.yuhr.org/issues/3/comments
created_at: '2023-06-08T12:59:13Z'
events_url: https://api.github.com/repos/yuhr/blog.yuhr.org/issues/3/events
html_url: https://github.com/yuhr/blog.yuhr.org/issues/3
id: 1747848717
labels: []
labels_url: https://api.github.com/repos/yuhr/blog.yuhr.org/issues/3/labels{/name}
locked: false
milestone: 
node_id: I_kwDOJbYSL85oLg4N
number: 3
performed_via_github_app: 
reactions:
  "+1": 0
  "-1": 0
  confused: 0
  eyes: 0
  heart: 0
  hooray: 0
  laugh: 0
  rocket: 0
  total_count: 0
  url: https://api.github.com/repos/yuhr/blog.yuhr.org/issues/3/reactions
repository_url: https://api.github.com/repos/yuhr/blog.yuhr.org
state: closed
state_reason: completed
timeline_url: https://api.github.com/repos/yuhr/blog.yuhr.org/issues/3/timeline
title: Soft Tabs Are Hard
updated_at: '2023-06-09T08:29:04Z'
url: https://api.github.com/repos/yuhr/blog.yuhr.org/issues/3
user:
  avatar_url: https://avatars.githubusercontent.com/u/18474125?v=4
  events_url: https://api.github.com/users/yuhr/events{/privacy}
  followers_url: https://api.github.com/users/yuhr/followers
  following_url: https://api.github.com/users/yuhr/following{/other_user}
  gists_url: https://api.github.com/users/yuhr/gists{/gist_id}
  gravatar_id: ''
  html_url: https://github.com/yuhr
  id: 18474125
  login: yuhr
  node_id: MDQ6VXNlcjE4NDc0MTI1
  organizations_url: https://api.github.com/users/yuhr/orgs
  received_events_url: https://api.github.com/users/yuhr/received_events
  repos_url: https://api.github.com/users/yuhr/repos
  site_admin: false
  starred_url: https://api.github.com/users/yuhr/starred{/owner}{/repo}
  subscriptions_url: https://api.github.com/users/yuhr/subscriptions
  type: User
  url: https://api.github.com/users/yuhr

---
Every time I hear people saying “hard” or “soft” when talking about indentation style, I feel it's the other way around, because what people call the “soft” way is to bake the visual width of indentation into the file, which can be thought as a typical instance of hardcoding, like in analogy with “hard wraps”.

Actually, they're saying “hard” or “soft” about “tabs”, not about “indentation”, so I understand it's okay to say baking tabs into the file as “hard tabs”. But wait...

Strictly speaking, what exactly we want to do is to *perform indentation*, not to *insert tabs or spaces* specifically. Tabs or spaces are just two naïve implementations of indentation. It sounds unnatural to me to use the words like “hard *tabs*” and “soft *tabs*” when talking about indentation. I don't know who has started such wording, but this is the time to reconsider what those words mean.

Instead I propose this wording: “**soft indentation**” and “**hard indentation**”. Just like the “soft wrapping” leaves where to insert line break to the renderer, “soft indentation” leaves how much width a single level of indentation takes to the renderer. On the other hand, “hard indentation” hardcodes it by encoding the width to the number of spaces. Quite natural, isn't it?

TL;DR, the correspondence is:

- **Soft indentation = Hard tabs**
- **Hard indentation = Soft tabs**

So, remember, **soft tabs are hard**.