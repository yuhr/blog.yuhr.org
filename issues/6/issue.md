---
active_lock_reason: 
assignee: 
assignees: []
author_association: OWNER
closed_at: '2024-03-25T04:25:07Z'
comments: 0
comments_url: https://api.github.com/repos/yuhr/blog.yuhr.org/issues/6/comments
created_at: '2024-03-19T04:13:18Z'
events_url: https://api.github.com/repos/yuhr/blog.yuhr.org/issues/6/events
html_url: https://github.com/yuhr/blog.yuhr.org/issues/6
id: 2193973359
labels: []
labels_url: https://api.github.com/repos/yuhr/blog.yuhr.org/issues/6/labels{/name}
locked: false
milestone: 
node_id: I_kwDOJbYSL86CxWBv
number: 6
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
  url: https://api.github.com/repos/yuhr/blog.yuhr.org/issues/6/reactions
repository_url: https://api.github.com/repos/yuhr/blog.yuhr.org
state: closed
state_reason: completed
timeline_url: https://api.github.com/repos/yuhr/blog.yuhr.org/issues/6/timeline
title: FLOSSのIssue消化戦略
updated_at: '2024-03-25T04:25:08Z'
url: https://api.github.com/repos/yuhr/blog.yuhr.org/issues/6
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
何かがスケールすると発生し始める問題の一つに、「FLOSSの有名税」とでも言うべきものがあると筆者は考えている。

以前、[expressjs/express](https://github.com/expressjs/express)がスパムPR爆撃を受けていた件が[話題](https://socket.dev/blog/express-js-spam-prs-commoditization-of-open-source)になっていた。ざっくり言うと、GitHubのPRの作り方を説明するチュートリアルをYouTubeに出していたIT教育系動画投稿者がいて[^0]、それを観た大量のバカが実際にスパムPRを作成しまくったという事件だ。

expressjs/expressの件はさすがに極端な例だけど、そこまでいかなくとも、そのソフトウェアが有名になるにつれて、作成される（スパムではない）Issueが多すぎてメンテナーが対処しきれなくなるという事態は往々にして発生する。これ自体は仕方のないことだし、メンテナーが疲弊するのも理解できるが、そのせいで自動クローズbotみたいな仕組みを導入し始めるのは、いくらメンテナンスが大変でもやってはいけないことだと思う。それは隠密的なメンテナンスの放棄に等しいし、Issueという仕組みの意義を破壊してしまう。問題があってIssueが作成されたのであれば、問題が解決していないのにIssueをクローズするのは、メンテナーの自己満足、欺瞞であり、臭いものに蓋をしているだけである。それをわかっていてやるのであればまだいいが、メンテナーは本当にその不評を被る覚悟があるのだろうか。

---

自動クローズbotの導入方法がGitHubの公式ドキュメントに[書かれている](https://docs.github.com/en/actions/managing-issues-and-pull-requests/closing-inactive-issues)ということも、なかなかに信じがたい。Issueのクローズ理由の一つに“stale”があるので、動きがないIssueをクローズするというのはGitHub的には正当なのかもしれない。

<img width="328" alt="Screenshot 2024-03-18 at 15 19 05" src="https://github.com/yuhr/blog.yuhr.org/assets/18474125/031d9a2e-018a-473b-8afe-d4ccb0984af2">

個人的には、Issueの分類やクローズ理由としての“stale”というのは、ソフトウェアの他の部分で機能追加したりバグ修正したりすることによって、そのIssueに挙げられた問題が副作用的に解決していた場合を指しているのかと思っていたが、その認識がおかしいのかもしれない。というか、そもそも「解決していた」なら“resolved”扱いでいいのかもしれない。そうなってくると、筆者の立場としては、クローズ理由から“stale”を削除するべきという話になる。

---

「ソフトウェアに問題がある」という旨のIssueを「Issue作成日時が古いから」という理由でクローズしていいケースというのは存在しない。表立ってメンテナンスを放棄していたとしても、である。オープンなIssueは「治っていない問題」の一覧であり、いくら古くても問題が残っている限りIssueを残しておかなければならない。それがメンテナンス放棄ということの意味である。

手動で作成された、ちゃんと意味のあるIssueを自動で[^1]クローズしていいケースというのも存在しない。Issue消化に関する自動化として最大限考えうるのは、「重複するかもしれない既存のIssueをAIでリストアップしてチェックボックスを出しておき、メンテナーによってチェックされたらそのIssueのduplicateとしてクローズする」とか、「質の低い（再現手順がないなど）可能性のあるIssueにそういうタグをつける」などといった、あくまで「判断をメンテナーに任せる」自動化だけだろう。

あまりGitHubでIssueを漁ることがない人には、何を当たり前のことをと思われるかもしれないが、実際にそうやってクローズされているIssueがGitHubにはたくさんある。特に大きいプロジェクトほどそのような傾向が認められる。

---

思うに、自動クローズなどをやり始めてしまうのは、Issueをカスタマーサポートのようなものだと考えているメンテナーたちだろう[^2]。カスタマーサポートというものは、その成り立ちからして、問題ベースではなくカスタマーからのアクションベースで動いているものだ。苦情がなければ動かなくていいという行政的な考えと、自動クローズとの間には親和性がある。しかしFLOSSにおいては、ユーザーとメンテナーを立場上分離するような考え方や、それら人間を中心とする考え方ではなく、ソフトウェアそれ自体を中心とする考え方で開発を進めるべきだし、それに基づけば、メンテナーの労力の都合でソフトウェアの問題がなかったことにされるというのは、発想すらあり得ないような事態だ。

正しい方法で大量のIssueに対処するなら、各メンテナーの稼働時間を増やすか、メンテナーの数を増やすしかないのだが、それはそれでまた別の問題が発生するおそれが出てくるので、難しい。とにかく、何かがスケールすればするほどその世界は崩壊に向かっていく、というのが自然の摂理なのだろう。政治の直面する不可能そのものである。結局のところこれは倫理や良心の問題であって、考え方が異なる人たちがいる以上、無くなることはないのかもしれない。

---

[^0]: 一応、少なくともコメントでは「実際にはテスト用のPRを送らないように」という旨の[免責文](https://www.youtube.com/watch?v=Ez8F0nW6S-w&lc=UgyjLIPaIm6z029WBhp4AaABAg)が出されてはいる。筆者は動画本体は観ていないので確かなことは言えないが、動画の中にも同じ旨の注意はあったらしい。
[^1]: 「自動で」というのは「人間の判断なく」という意味。関連付けられたPRのマージに従ってクローズされるケースは、人間の判断によるので含まない。
[^2]: メンテナーにそう思わせてしまうGitHubのUIにもいささか問題があるかもしれないが、かといってどうデザインすればいいのかという案は筆者には湧いてこない。おそらく、そもそもGitHubのような場所で中央集権的にソフトウェアを管理するのをやめる必要がある。