---
active_lock_reason: 
assignee: 
assignees: []
author_association: OWNER
closed_at: '2025-05-09T00:54:14Z'
comments: 0
comments_url: https://api.github.com/repos/yuhr/blog.yuhr.org/issues/9/comments
created_at: '2025-05-09T00:12:52Z'
events_url: https://api.github.com/repos/yuhr/blog.yuhr.org/issues/9/events
html_url: https://github.com/yuhr/blog.yuhr.org/issues/9
id: 3050416641
labels: []
labels_url: https://api.github.com/repos/yuhr/blog.yuhr.org/issues/9/labels{/name}
locked: false
milestone: 
node_id: I_kwDOJbYSL8610aoB
number: 9
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
  url: https://api.github.com/repos/yuhr/blog.yuhr.org/issues/9/reactions
repository_url: https://api.github.com/repos/yuhr/blog.yuhr.org
state: closed
state_reason: completed
sub_issues_summary:
  completed: 0
  percent_completed: 0
  total: 0
timeline_url: https://api.github.com/repos/yuhr/blog.yuhr.org/issues/9/timeline
title: Semantic Versioning Is Abused
updated_at: '2025-05-09T00:54:14Z'
url: https://api.github.com/repos/yuhr/blog.yuhr.org/issues/9
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
  user_view_type: public

---
In recent decades, a number of package ecosystems have been built around the concept of [Semantic Versioning](https://semver.org) (SemVer hereafter) in the wild. To me, this seems absurd from the perspective of reliable systems engineering.

## Problem: You Have to Trust Your Ability to Version

To get started in SemVer, the first problem you have to deal with is to decide which number to bump for your releases. There will be almost no reduction in the cognitive load required to make these decisions, even after dozens of releases you published. You sometimes might include breaking changes into a minor release by mistake, or even if you believe that the change is definitely nonbreaking before releasing, eventually your users might experience the change as breaking.

The more disappointing fact is that there's no general algorithm to prove a version tag is correct for a release—it's simply impossible. The correctness varies depending on the situation of the software. For example, when you noticed a seemingly undesirable behavior in your library, do you think the release fixing the behavior is patch level, or major level? You would think it's a patch as usual, but what if you know one of downstream softwares has code that depends on that behavior? Or what if you know almost all of downstream do so? Or what if *actually* they do so while you can't even know? Library authors have to consider such situations all along upon their releases. Of course it's correct to release as “a patch because it's undesirable on its own”, and still other options are also downright correct like “a patch because the dependents are ignorably few” and “a major because the dependents are considerably numerous”. But I'd say not so many developers could decide like that confidently and bravely.

Under SemVer, no matter how confident a developer believes their change is really great, they have to be overcareful when releasing. SemVer forces library authors to suffer from being seized with fear that they might break uncountable builds of softwares anywhere in the world.

### Pseudosolution: Do Not Trust Your Ability to Version

Bump the major version only. There's no one who can recognize every single usage of their library, thus it's always *better* choice to go for releasing as a major.

As you notice, SemVer doesn't make sense anymore if you always release as a major.

## Problem: You Have to Trust Every Developer's Ability to Version

Once you've got a misversioned library in the dependency graph of your software, you shall confront unhelpful build errors while autoupdating your dependencies, or users might experience a bug after a release. The idea of “compatibility between versions” is all too often a fantasy.

Systems built on top of SemVer only works as long as such vulnerable relationships of interhuman trust is working. One could say the idea of reusing libraries made by someone is itself already based on some kind of trust, but wait, the greatness of a software and the ability to develop such a software are totally different thing than the ability to version. Library updates are always likely to cause broken builds regardless of how much the library is great.

### Pseudosolution: Don't Trust Every Developer's Ability to Version

Pin each of your dependencies to a specific version.

Again, SemVer will become useless then.

## The Worst Abusage Ever: Deduplication

Unfortunately, most package managers not only deduplicate dependencies as per SemVer by default, but even don't support disabling it! While deduplication must be carefully done by involved developers preferably manually ensuring the version combination really works well in that specific situation, current systems automatically deduplicate as much as possible as per the version range requirements in the dependency graph. The infamous “[dependency hell](https://en.wikipedia.org/wiki/Dependency_hell)” all comes out of this process, but this is how it is done.

I'd agree with [this topic in the users forum of Rust](https://users.rust-lang.org/t/psa-please-specify-precise-dependency-versions-in-cargo-toml/71277), especially the following sentence in [this comment](https://users.rust-lang.org/t/psa-please-specify-precise-dependency-versions-in-cargo-toml/71277/23):

> And so I say: if you’re not deliberately testing on minimal versions, all approaches other than exact version dependencies (like `serde = "=1.0.130"`) are Wrong™.

Almost every library would be developed by a single developer (at least initially), and with such a low development resource it's too hard to ensure their library works with every possible combination of versions of the dependencies. **No two versions of a library should be considered compatible unless tested explicitly**. I believe this is supposed to be the baseline concept of software development. 

Sounds radical? Yes, radically installing multiple copies of the same library might cause special-case problems in turn, for instance:

- **Mutable statics**. Libraries that internally use static area as a global mutable state might not work correctly. Mutating statically allocated memory must be a deprecated idea for any future software development. Instead, we should be passing states all around as arguments like done in functional-styled programming.
- **Type system**. In major implementations of nominal type systems, types with the same name but from different versions are actually treated as completely different ones, thus cannot be used interchangeably. This is just a false problem where language design tightly couples the identity of types with *where it was defined*. Instead, language designers should find a way to identify types by *what purpose it was defined for*.

These points should be thought of as temporary thing in the migration period to the next technological innovation that eliminates any form of dependency hell.

## Core Purpose of SemVer

Reading down to this section, you already understand that mechanically relying on systems based on SemVer (like package managers) is inherently problematic. Then what's the point of SemVer?

SemVer is just a convention. Nothing more, nothing less. Sometimes wrong versioning is made, because the versioner is a human. It's no surprise that we (humans!) make mistakes, but unfortunately we've been still making the biggest mistakes these days: trying to build reliable systems on top of a mere convention.

The heart of SemVer is literally “semantic” versioning; this means that SemVer is purely for humans, not for machines. One of the dark side of SemVer is that it defines the machine readable form of version tags, and looks promising about compatibility between versions of softwares, while actually it doesn't guarantee the semantics at all. These version tags are just given as a hint for users by the developer, and it's all up to users to trust this hint. Pessimists like me would think the hint is almost meaningless, but quite a few people wouldn't think so, and probably that's why SemVer gained this popularity.

## Real Solution: Stop Using “Packages”

Those pseudosolutions are just workarounds under the reign of packages. If possible, humanity should progress to the direction not relying on “packages”. It might sound ridiculous, but I mean somewhat more specific: just **to stop thinking about software development ecosystems in the unit of packages**. At least developers of a new programming language should reconsider whether to involve the concept of package into their automation systems.

Fundamentally, I think it's pointless to release softwares at the granularity of package. It's rather reasonable to give a version number for each public API (exported symbol) and release separately.

There're multiple issues in releasing in the unit of packages. For example:

- When a major version of a package is released with some bugfixes, users who are not using the part of the APIs the breaking change was made on will receive an impact that they can't get a very simple bugfix to the part they're using without investigating and validating the whole released contents. Not all developers have resource to provide backports.
- Package authors have to manage a complex schedule to determine the order in which they merge changes, to reduce the impact described above as much as possible.
- The more a package grows large, the more the difficulty of versioning gets increased. A large package means a large cognitive load to understand the relationships between the public APIs.

Per API versioning addresses these cases, although whether we should use SemVer again or not anymore for tagging versions would be another debatable topic.

---

Further reading:

- There's already a study called [version polymorphism](https://prg.is.titech.ac.jp/papers/pdf/thesis-m/2020-tanabe.pdf) that proposes a core calculus enriched with version numbers and statically verify compatibility of programs.
- The [Unison](https://www.unison-lang.org) programming language implements a thrilling idea: [the global content-addressed syntax forest library called “codebase”](https://www.unison-lang.org/docs/the-big-idea/). This consequently deduplicates code instead of packages, in a sound manner.