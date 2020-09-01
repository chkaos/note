# 6.02 Introduction to EECS II: Digital Communication Systems

## 课程目标和介绍

An introduction to several fundamental ideas in electrical engineering and computer science, using digital communication systems as the vehicle. The three parts of the course—bits, signals, and packets—cover three corresponding layers of abstraction relevant to the system:

binary representation, compression (source coding), and error correction (channel coding) for messages transmitted across a noisy link;
signal representation of binary messages for transmission across a shared physical channel subject to distortion and noise;
efficient, reliable communication across networks made up of multiple links.
Topics investigated in depth include:

Bits: Information and entropy, Huffman coding and LZW compression, error correction with linear block codes and convolutional codes (Viterbi decoding).
Signals: Additive Gaussian noise and the relationship between noise variance and bit errors, linear-time invariant channel models, frequency-domain (Fourier) analysis, spectral content of signals and filtering, modulation and demodulation.
Packets: Media access protocols (TDMA, Aloha, and carrier sense), packet-switched networks, queues, and Little's law, network routing (distance/path vector & link-state protocols), and reliable data transport (adaptive timers, stop-and-wait, sliding windows, round-trip time and bandwidth-delay product concepts).
These topics form the basis of communication systems like the Internet.

The course teaches ideas that are useful in other parts of EECS: abstraction, probabilistic analysis, superposition, time- and frequency-domain representations, system design principles and trade-offs, and centralized and distributed algorithms. The course emphasizes connections between theoretical concepts and practice using programming tasks and some experiments with real-world communication channels.

At the end of the course, a successful student will understand these topics and be able to apply them to the design and analysis of communication systems and networks. In particular, they will appreciate how to build reliable and efficient communication systems: cleverly applying redundancy for reliability and sharing via multiplexing channels, links, and paths for efficiency.

是系列课之二, Introduction to Electrical Engineering and Computer Science I 这一门是第一课, 偏向于实验课.

2020-09-01 前置课程除了6.01 上面一门以外还有初等数学 微分方程(Differential equation)... 头都大了, 由于看了一半公开课还是一头雾水的感觉, 这两门前置课就以"练习题-课本"的模式选择性学习, 现这一门课暂时搁置一段时间直到完成前置课程.