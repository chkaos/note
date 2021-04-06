(window.webpackJsonp=window.webpackJsonp||[]).push([[99],{476:function(e,n,t){"use strict";t.r(n);var s=t(45),a=Object(s.a)({},(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"_18-case-studies-dynamo"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_18-case-studies-dynamo"}},[e._v("#")]),e._v(" 18. Case Studies:Dynamo")]),e._v(" "),t("p",[e._v("Dynamo: Amazon's Highly Available Key-value Store\nDeCandia et al, SOSP 2007")]),e._v(" "),t("p",[e._v("Why are we reading this paper?\nDatabase, eventually consistent, write any replica\nLike Ficus -- but a database! A surprising design.\nA real system: used for e.g. shopping cart at Amazon\nMore available than PNUTS, Spanner, &c\nLess consistent than PNUTS, Spanner, &c\nInfluential design; inspired e.g. Cassandra\n2007: before PNUTS, before Spanner")]),e._v(" "),t("p",[e._v('Their Obsessions\nSLA, e.g. 99.9th percentile of delay < 300 ms\nconstant failures\n"data centers being destroyed by tornadoes"\n"always writeable"')]),e._v(" "),t("p",[e._v("Big picture\n[lots of data centers, Dynamo nodes]\neach item replicated at a few random nodes, by key hash")]),e._v(" "),t("p",[e._v("Why replicas at just a few sites? Why not replica at every site?\nwith two data centers, site failure takes down 1/2 of nodes\nso need to be careful that "),t("em",[e._v("everything")]),e._v(" replicated at "),t("em",[e._v("both")]),e._v(" sites\nwith 10 data centers, site failure affects small fraction of nodes\nso just need copies at a few sites")]),e._v(" "),t("p",[e._v("Consequences of mostly remote access (since no guaranteed local copy)\nmost puts/gets may involve WAN traffic -- high delays\nmaybe distinct Dynamo instances with limited geographical scope?\npaper quotes low average delays in graphs but does not explain\nmore vulnerable to network failure than PNUTS\nagain since no local copy")]),e._v(" "),t("p",[e._v('Consequences of "always writeable"\nalways writeable => no master! must be able to write locally.\nalways writeable + failures = conflicting versions')]),e._v(" "),t("p",[e._v("Idea #1: eventual consistency\naccept writes at any replica\nallow divergent replicas\nallow reads to see stale or conflicting data\nresolve multiple versions when failures go away\nlatest version if no conflicting updates\nif conflicts, reader must merge and then write\nlike Bayou and Ficus -- but in a DB")]),e._v(" "),t("p",[e._v('Unhappy consequences of eventual consistency\nMay be no unique "latest version"\nRead can yield multiple conflicting versions\nApplication must merge and resolve conflicts\nNo atomic operations (e.g. no PNUTS test-and-set-write)')]),e._v(" "),t("p",[e._v("Idea #2: sloppy quorum\ntry to get consistency benefits of single master if no failures\nbut allows progress even if coordinator fails, which PNUTS does not\nwhen no failures, send reads/writes through single node\nthe coordinator\ncauses reads to see writes in the usual case\nbut don't insist! allow reads/writes to any replica if failures")]),e._v(" "),t("p",[e._v('Where to place data -- consistent hashing\n[ring, and physical view of servers]\nnode ID = random\nkey ID = hash(key)\ncoordinator: successor of key\nclients send puts/gets to coordinator\nreplicas at successors -- "preference list"\ncoordinator forwards puts (and gets...) to nodes on preference list')]),e._v(" "),t("p",[e._v("Why consistent hashing?\nPro\nnaturally somewhat balanced\ndecentralized -- both lookup and join/leave\nCon (section 6.2)\nnot really balanced (why not?), need virtual nodes\nhard to control placement (balancing popular keys, spread over sites)\njoin/leave changes partition, requires data to shift")]),e._v(" "),t("p",[e._v("Failures\nTension: temporary or permanent failure?\nnode unreachable -- what to do?\nif temporary, store new puts elsewhere until node is available\nif permanent, need to make new replica of all content\nDynamo itself treats all failures as temporary")]),e._v(" "),t("p",[e._v("Temporary failure handling: quorum\ngoal: do not block waiting for unreachable nodes\ngoal: put should always succeed\ngoal: get should have high prob of seeing most recent put(s)\nquorum: R + W > N\nnever wait for all N\nbut R and W will overlap\ncuts tail off delay distribution and tolerates some failures\nN is first N "),t("em",[e._v("reachable")]),e._v(' nodes in preference list\neach node pings successors to keep rough estimate of up/down\n"sloppy" quorum, since nodes may disagree on reachable\nsloppy quorum means R/W overlap '),t("em",[e._v("not guaranteed")])]),e._v(" "),t("p",[e._v("coordinator handling of put/get:\nsends put/get to first N reachable nodes, in parallel\nput: waits for W replies\nget: waits for R replies\nif failures aren't too crazy, get will see all recent put versions")]),e._v(" "),t("p",[e._v("When might this quorum scheme "),t("em",[e._v("not")]),e._v(" provide R/W intersection?")]),e._v(" "),t("p",[e._v('What if a put() leaves data far down the ring?\nafter failures repaired, new data is beyond N?\nthat server remembers a "hint" about where data really belongs\nforwards once real home is reachable\nalso -- periodic "merkle tree" sync of key range')]),e._v(" "),t("p",[e._v("How can multiple versions arise?\nMaybe a node missed the latest write due to network problem\nSo it has old data, should be superseded by newer put()s\nget() consults R, will likely see newer version as well as old")]),e._v(" "),t("p",[e._v("How can "),t("em",[e._v("conflicting")]),e._v(' versions arise?\nN=3 R=2 W=2\nshopping cart, starts out empty ""\npreference list n1, n1, n3, n4\nclient 1 wants to add item X\nget() from n1, n2, yields ""\nn1 and n2 fail\nput("X") goes to n3, n4\nclient 2 wants to delete X\nget() from n3, n4, yields "X"\nput("") to n3, n4\nn1, n2 revive\nclient 3 wants to add Y\nget() from n1, n2 yields ""\nput("Y") to n1, n2\nclient 3 wants to display cart\nget() from n1, n3 yields two values!\n"X" and "Y"\nneither supersedes the other -- the put()s conflicted')]),e._v(" "),t("p",[e._v("How should clients resolve conflicts on read?\nDepends on the application\nShopping basket: merge by taking union?\nWould un-delete item X\nWeaker than Bayou (which gets deletion right), but simpler\nSome apps probably can use latest wall-clock time\nE.g. if I'm updating my password\nSimpler for apps than merging\nWrite the merged result back to Dynamo")]),e._v(" "),t("p",[e._v("How to detect whether two versions conflict?\nAs opposed to a newer version superseding an older one\nIf they are not bit-wise identical, must client always merge+write?\nWe have seen this problem before...")]),e._v(" "),t("p",[e._v("Version vectors\nExample tree of versions:\n[a:1]\n[a:1,b:2]\nVVs indicate v1 supersedes v2\nDynamo nodes automatically drop [a:1] in favor of [a:1,b:2]\nExample:\n[a:1]\n[a:1,b:2]\n[a:2]\nClient must merge")]),e._v(" "),t("p",[e._v('get(k) may return multiple versions, along with "context"\nand put(k, v, context)\nput context tells coordinator which versions this put supersedes/merges')]),e._v(" "),t("p",[e._v("Won't the VVs get big?\nYes, but slowly, since key mostly served from same N nodes\nDynamo deletes least-recently-updated entry if VV has > 10 elements")]),e._v(" "),t("p",[e._v("Impact of deleting a VV entry?\nwon't realize one version subsumes another, will merge when not needed:\nput@b: [b:4]\nput@a: [a:3, b:4]\nforget b:4: [a:3]\nnow, if you sync w/ [b:4], looks like a merge is required\nforgetting the oldest is clever\nsince that's the element most likely to be present in other branches\nso if it's missing, forces a merge\nforgetting "),t("em",[e._v("newest")]),e._v(" would erase evidence of recent difference")]),e._v(" "),t("p",[e._v("Is client merge of conflicting versions always possible?\nSuppose we're keeping a counter, x\nx starts out 0\nincremented twice\nbut failures prevent clients from seeing each others' writes\nAfter heal, client sees two versions, both x=1\nWhat's the correct merge result?\nCan the client figure it out?")]),e._v(" "),t("p",[e._v("What if two clients concurrently write w/o failure?\ne.g. two clients add diff items to same cart at same time\nEach does get-modify-put\nThey both see the same initial version\nAnd they both send put() to same coordinator\nWill coordinator create two versions with conflicting VVs?\nWe want that outcome, otherwise one was thrown away\nPaper doesn't say, but coordinator could detect problem via put() context")]),e._v(" "),t("p",[e._v("Permanent server failures / additions?\nAdmin manually modifies the list of servers\nSystem shuffles data around -- this takes a long time!")]),e._v(" "),t("p",[e._v("The Question:\nIt takes a while for notice of added/deleted server to become known\nto all other servers. Does this cause trouble?\nDeleted server might get put()s meant for its replacement.\nDeleted server might receive get()s after missing some put()s.\nAdded server might miss some put()s b/c not known to coordinator.\nAdded server might serve get()s before fully initialized.\nDynamo probably will do the right thing:\nQuorum likely causes get() to see fresh data as well as stale.\nReplica sync (4.7) will fix missed get()s.")]),e._v(" "),t("p",[e._v("Is the design inherently low delay?\nNo: client may be forced to contact distant coordinator\nNo: some of the R/W nodes may be distant, coordinator must wait")]),e._v(" "),t("p",[e._v("What parts of design are likely to help limit 99.9th pctile delay?\nThis is a question about variance, not mean\nBad news: waiting for multiple servers takes "),t("em",[e._v("max")]),e._v(" of delays, not e.g. avg\nGood news: Dynamo only waits for W or R out of N\ncuts off tail of delay distribution\ne.g. if nodes have 1% chance of being busy with something else\nor if a few nodes are broken, network overloaded, &c")]),e._v(" "),t("p",[e._v("No real Eval section, only Experience")]),e._v(" "),t("p",[e._v("How does Amazon use Dynamo?\nshopping cart (merge)\nsession info (maybe Recently Visited &c?) (most recent TS)\nproduct list (mostly r/o, replication for high read throughput)")]),e._v(" "),t("p",[e._v("They claim main advantage of Dynamo is flexible N, R, W\nWhat do you get by varying them?\nN-R-W\n3-2-2 : default, reasonable fast R/W, reasonable durability\n3-3-1 : fast W, slow R, not very durable, not useful?\n3-1-3 : fast R, slow W, durable\n3-3-3 : ??? reduce chance of R missing W?\n3-1-1 : not useful?")]),e._v(" "),t("p",[e._v("They had to fiddle with the partitioning / placement / load balance (6.2)\nOld scheme:\nRandom choice of node ID meant new node had to split old nodes' ranges\nWhich required expensive scans of on-disk DBs\nNew scheme:\nPre-determined set of Q evenly divided ranges\nEach node is coordinator for a few of them\nNew node takes over a few entire ranges\nStore each range in a file, can xfer whole file")]),e._v(" "),t("p",[e._v("How useful is ability to have multiple versions? (6.3)\nI.e. how useful is eventual consistency\nThis is a Big Question for them\n6.3 claims 0.001% of reads see divergent versions\nI believe they mean conflicting versions (not benign multiple versions)\nIs that a lot, or a little?\nSo perhaps 0.001% of writes benefitted from always-writeable?\nI.e. would have blocked in primary/backup scheme?\nVery hard to guess:\nThey hint that the problem was concurrent writers, for which\nbetter solution is single master\nBut also maybe their measurement doesn't count situations where\navailability would have been worse if single master")]),e._v(" "),t("p",[e._v('Performance / throughput (Figure 4, 6.1)\nFigure 4 says average 10ms read, 20 ms writes\nthe 20 ms must include a disk write\n10 ms probably includes waiting for R/W of N\nFigure 4 says 99.9th pctil is about 100 or 200 ms\nWhy?\n"request load, object sizes, locality patterns"\ndoes this mean sometimes they had to wait for coast-coast msg?')]),e._v(" "),t("p",[e._v('Puzzle: why are the average delays in Figure 4 and Table 2 so low?\nImplies they rarely wait for WAN delays\nBut Section 6 says "multiple datacenters"\nyou\'d expect '),t("em",[e._v("most")]),e._v(" coordinators and most nodes to be remote!\nMaybe all datacenters are near Seattle?")]),e._v(" "),t("p",[e._v("Wrap-up\nBig ideas:\neventual consistency\nalways writeable despite failures\nallow conflicting writes, client merges\nAwkward model for some applications (stale reads, merges)\nthis is hard for us to tell from paper\nMaybe a good way to get high availability + no blocking on WAN\nbut PNUTS master scheme implies Yahoo thinks not a problem\nNo agreement on whether eventual consistency is good for storage systems")])])}),[],!1,null,null,null);n.default=a.exports}}]);