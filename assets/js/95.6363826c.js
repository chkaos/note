(window.webpackJsonp=window.webpackJsonp||[]).push([[95],{472:function(e,t,a){"use strict";a.r(t);var n=a(45),i=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"_14-spark-case-study"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_14-spark-case-study"}},[e._v("#")]),e._v(" 14.Spark Case Study")]),e._v(" "),a("p",[e._v("Resilient Distributed Datasets: A Fault-Tolerant Abstraction for In-Memory Cluster Computing\nZaharia, Chowdhury, Das, Dave, Ma, McCauley, Franklin, Shenker, Stoica\nNSDI 2012")]),e._v(" "),a("p",[e._v("Had TreadMarks since 1996, and Distributed Shared Memory is a very general abstraction. Why use MapReduce? Or why even use TreadMarks?\nSay looking through a log, why not implement it using the regular abstractions (sockets, files etc?)\nSaves a lot of work:\ncommunication between nodes\ndistribute code\nschedule work\nhandle failures")]),e._v(" "),a("p",[e._v("The MapReduce paper had a lot of impact on big data analytics: simple and powerful.\nBut bit too rigid. Other systems proposed fixes:")]),e._v(" "),a("p",[e._v("Dryad (Microsoft 2007): any directed acyclic graph, edges are communication channels, can be through disk or via TCP.")]),e._v(" "),a("ul",[a("li",[e._v("can implement multiple iterations")]),e._v(" "),a("li",[e._v("can pipeline through RAM, don't have to go to disk")])]),e._v(" "),a("ul",[a("li",[e._v('very low level:\ndoesn\'t deal with partitioning of data, want 100,000 mappers? add 100,000 nodes\nwhat happens if you run out of RAM? (brief mention of "downgrading" a TCP channel to a disk file)')]),e._v(" "),a("li",[e._v("doesn't checkpoint/replicate, in the middle of the run (so failures can be expensive)")])]),e._v(" "),a("ul",[a("li",[e._v('Pig latin (Yahoo 2008): programming language that compiles to MapReduce. Adds "Database style" operators, mainly Join\nJoin: dataset 1 (k1,v1), dataset 2 (k1, v2). ==> (k1, v1, v2), takes cartesian product (all tuples of combinations of v1, v2 with same k1)\nExample: dataset 1: all clicks on products on website, dataset 2: demographics (age of users), want average age of customer per product.\n'),a("ul",[a("li",[e._v("allows multiple iterations")]),e._v(" "),a("li",[e._v("can express more")])]),e._v(" "),a("ul",[a("li",[e._v("still has rigidness from MR (writes to disk after map, to replicated storage after reduce, RAM)")])])])]),e._v(" "),a("p",[e._v("Spark")]),e._v(" "),a("p",[e._v("A framework for large scale distributed computation.\nAn expressive programming model (can express iteration and joins)\nGives user control over trade off between fault tolerance with performance\nif user frequently perist w/REPLICATE, fast recovery, but slower execution\nif infrequently, fast execution but slow recovery")]),e._v(" "),a("p",[e._v("Relatively recent release, but used by (partial list) IBM, Groupon, Yahoo, Baidu..\nCan get substantial performance gains when dataset (or a major part of it) can fit in memory, so anticipated to get more traction.\nMapReduce is simple")]),e._v(" "),a("p",[e._v("Abstraction of Resilient Distributed Datasets: an RDD is a collection of partitions of records.\nTwo operations on RDDs:\nTransformations: compute a new RDD from existing RDDs (flatMap, reduceByKey)\nthis just specifies a plan. runtime is lazy - doesn't have to materialize (compute), so it doesn't\nActions: where some effect is requested: result to be stored, get specific value, etc.\ncauses RDDs to materialize.")]),e._v(" "),a("p",[e._v("Logistic regression (from paper):\nval points = spark.textFile(...)\n.map(parsePoint).persist()\nvar w = // random initial vector\nfor (i <- 1 to ITERATIONS) {\nval gradient = points.map{ p =>\np.x * (1/(1+exp(-p.y*(w dot p.x)))-1)*p.y\n}.reduce((a,b) => a+b)\nw -= gradient\n}")]),e._v(" "),a("ul",[a("li",[e._v("w is sent with the closure to the nodes")]),e._v(" "),a("li",[e._v("materializes a new RDD in every loop iteration")])]),e._v(" "),a("p",[e._v("PageRank (from paper):\nval links = spark.textFile(...).map(...).persist() // (URL, outlinks)\nvar ranks = // RDD of (URL, rank) pairs\nfor (i <- 1 to ITERATIONS) {\n// Build an RDD of (targetURL, float) pairs\n// with the contributions sent by each page\nval contribs = links.join(ranks).flatMap {\n(url, (links, rank)) =>\nlinks.map(dest => (dest, rank/links.size))\n}\n// Sum contributions by URL and get new ranks\nranks = contribs.reduceByKey((x,y) => x+y)\n.mapValues(sum => a/N + (1-a)*sum)\n}")]),e._v(" "),a("p",[e._v("What is an RDD (table 3, S4)\nlist of partitions\nlist of (parent RDD, wide/narrow dependency)\nfunction to compute\npartitioning scheme\ncomputation placement hint\nEach transformation takes (one or more) RDDs, and outputs the transformed RDD.")]),e._v(" "),a("p",[e._v("Q: Why does an RDD carry metadata on its partitioning?\nA: so transformations that depend on multiple RDDs know whether they need to shuffle data (wide dependency) or not (narrow)\nAllows users control over locality and reduces shuffles.")]),e._v(" "),a("p",[e._v("Q: Why the distinction between narrow and wide dependencies?\nA: In case of failure.\nnarrow dependency only depends on a few partitions that need to be recomputed.\nwide dependency might require an entire RDD")]),e._v(" "),a("p",[e._v("Handling faults.\nWhen Spark computes, by default it only generates one copy of the result, doesn't replicate. Without replication, no matter if it's put in RAM or disk, if node fails, on permanent failure, data is gone.\nWhen some partition is lost and needs to be recomputed, the scheduler needs to find a way to recompute it. (a fault can be detected by using a heartbeat)\nwill need to compute all partitions it depends on, until a partition in RAM/disk, or in replicated storage.\nif wide dependency, will need all partitions of that dependency to recompute, if narrow just one that RDD")]),e._v(" "),a("p",[e._v("So two mechanisms enable recovery from faults: lineage, and policy of what partitions to persist (either to one node or replicated)\nWe talked about lineage before (Transformations)")]),e._v(" "),a("p",[e._v("The user can call persist on an RDD.\nWith RELIABLE flag, will keep multiple copies (in RAM if possible, disk if RAM is full)\nWith REPLICATE flag, will write to stable storage (HDFS)\nWithout flags, will try to keep in RAM (will spill to disk when RAM is full)")]),e._v(" "),a("p",[e._v("Q: Is persist a transformation or an action?\nA: neither. It doesn't create a new RDD, and doesn't cause materialization. It's an instruction to the scheduler.")]),e._v(" "),a("p",[e._v("Q: By calling persist without flags, is it guaranteed that in case of fault that RDD wouldn't have to be recomputed?\nA: No. There is no replication, so a node holding a partition could fail.\nReplication (either in RAM or in stable storage) is necessary")]),e._v(" "),a("p",[e._v("Currently only manual checkpointing via calls to persist.\nQ: Why implement checkpointing? (it's expensive)\nA: Long lineage could cause large recovery time. Or when there are wide dependencies a single failure might require many partition re-computations.")]),e._v(" "),a("p",[e._v("Checkpointing is like buying insurance: pay writing to stable storage so can recover faster in case of fault.\nDepends on frequency of failure and on cost of slower recovery\nAn automatic checkpointing will take these into account, together with size of data (how much time it takes to write), and computation time.")]),e._v(" "),a("p",[e._v("So can handle a node failure by recomputing lineage up to partitions that can be read from RAM/Disk/replicated storage.\nQ: Can Spark handle network partitions?\nA: Nodes that cannot communicate with scheduler will appear dead. The part of the network that can be reached from scheduler can continue\ncomputation, as long as it has enough data to start the lineage from (if all replicas of a required partition cannot be reached, cluster\ncannot make progress)")]),e._v(" "),a("p",[e._v("What happens when there isn't enough memory?")]),e._v(" "),a("ul",[a("li",[e._v("LRU (Least Recently Used) on partitions\n"),a("ul",[a("li",[e._v("first on non-persisted")]),e._v(" "),a("li",[e._v("then persisted (but they will be available on disk. makes sure user cannot overbook RAM)")])])]),e._v(" "),a("li",[e._v('user can have control on order of eviction via "persistence priority"')]),e._v(" "),a("li",[e._v("no reason not to discard non-persisted partitions (if they've already been used)")])]),e._v(" "),a("p",[e._v("Shouldn't throw away partitions in RAM that are required but hadn't been used.")]),e._v(" "),a("p",[e._v('degrades to "almost" MapReduce behavior\nIn figure 7, k-means on 100 Hadoop nodes takes 76-80 seconds\nIn figure 12, k-means on 25 Spark nodes (with no partitions allowed in memory) takes 68.8\nDifference could be because MapReduce would use replicated storage after reduce, but Spark by default would only spill to local disk, no network latency and I/O load on replicas.\nno architectural reason why Spark would be slower than MR')]),e._v(" "),a("p",[e._v('Spark assumes it runs on an isolated memory space (multiple schedulers don\'t share the memory pool well).\nCan be solved using a "unified memory manager"\nNote that when there is reuse of RDDs between jobs, they need to run on the same scheduler to benefit anyway.')]),e._v(" "),a("p",[e._v('(from [P09])\nWhy not just use parallel databases? Commercially available: "Teradata, Aster Data, Netezza, DATAl-\nlegro (and therefore soon Microsoft SQL Server via Project Madi-\nson), Dataupia, Vertica, ParAccel, Neoview, Greenplum, DB2 (via\nthe Database Partitioning Feature), and Oracle (via Exadata)"')]),e._v(" "),a("p",[e._v("At the time, Parallel DBMS were")]),e._v(" "),a("ul",[a("li",[e._v("Some are expensive and Hard to set up right")]),e._v(" "),a("li",[e._v("SQL declarative (vs. procedural)")]),e._v(" "),a("li",[e._v("Required schema, indices etc (an advantages in some cases)")]),e._v(" "),a("li",[e._v('"Not made here"')])]),e._v(" "),a("p",[e._v("Picollo [P10] uses snapshots of a distributed key-value store to handle fault tolerance.")]),e._v(" "),a("ul",[a("li",[e._v("Computation is comprised of control functions and kernel functions.")]),e._v(" "),a("li",[e._v("Control functions are responsible for setting up tables (also locality), launching kernels, synchronization (barriers that wait for all kernels to complete), and starting checkpoints")]),e._v(" "),a("li",[e._v("Kernels use the key value store. There is a function to merge conflicting writes.")]),e._v(" "),a("li",[e._v("Checkpoints using Chandy-Lamport")])]),e._v(" "),a("ul",[a("li",[e._v("all data has to fit in RAM")]),e._v(" "),a("li",[e._v("to recover, all nodes need to revert (expensive)")]),e._v(" "),a("li",[e._v("no way to mitigate stragglers, cannot just re-run a kernel without reverting to a snapshot")])]),e._v(" "),a("p",[e._v("[P09] \"A Comparison of Approaches to Large-Scale Data Analysis\", Pavlo et al. SIGMOD'09\n[P10] Piccolo: Building Fast, Distributed Programs with Partitioned Tables, Power and Li, OSDI'10")])])}),[],!1,null,null,null);t.default=i.exports}}]);