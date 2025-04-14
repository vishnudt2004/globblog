class BlogReadTracker {
  constructor(element, options = {}, onComplete) {
    this.element = element;
    this.htmlContent = element.innerHTML;
    this.interval = null;
    this.timeSpent = 0;
    this.handleScroll = null;

    this.timeSpentReached = false;
    this.scrollReached = false;
    this.readCompleted = false;

    // Customizable options
    this.WPM = options.wordsPerMinute || 250; // Average reading speed
    this.requiredReadingTimePercent = options.requiredReadingTimePercent || 80; // 80% of the reading time. (e.g. 5min => 4min)
    this.requiredScrollPercent = options.requiredScrollPercent || 80; // 80% of the scroll from total content.

    // CBs
    this.onComplete = onComplete;
  }

  // Strip unwanted HTML tags and clean up the text
  stripHTMLTags() {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = this.htmlContent;

    const excludeElements = tempElement.querySelectorAll(
      "a, img, video, audio, iframe, object, embed, script, style",
    );
    excludeElements.forEach((el) => el.remove());

    const blockLevelElements = tempElement.querySelectorAll(
      "p, h1, h2, h3, h4, h5, h6, ol, ul, li, div, section, article, aside, blockquote",
    );
    blockLevelElements.forEach((el) => {
      el.insertAdjacentText("beforebegin", " ");
      el.insertAdjacentText("afterend", " ");
    });

    const cleanedText = tempElement.textContent || tempElement.innerText || "";
    return cleanedText.replace(/\s+/g, " ").trim();
  }

  // Calculate estimated reading time based on the cleaned text
  calculateReadingTime() {
    const plainText = this.stripHTMLTags();
    const wordsPerMinute = this.WPM;
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;

    if (wordCount === 0) return 0;

    const estimatedTime = wordCount / wordsPerMinute; // Time in minutes
    return estimatedTime > 0 ? Math.max(estimatedTime, 0.1) : 0; // Ensure minimum 6 sec (0.1 min)
  }

  // Check if the blog post is read based on time spent and scroll progress
  checkIfRead() {
    // console.log(
    //   `Checking read status... Time Spent: ${this.timeSpentReached}, Scroll Reached: ${this.scrollReached}`
    // ); // TEST

    if (this.timeSpentReached && this.scrollReached) {
      // console.log("🎉 Blog marked as READ"); // TEST

      this.readCompleted = true;
      if (typeof this.onComplete === "function") {
        this.onComplete(this.readCompleted); // Pass the complete status to the callback
      }
    }
  }

  // Start the reading timer
  startReadingTimer() {
    const readingTime = this.calculateReadingTime();
    const totalTimeMs = readingTime * 60 * 1000;
    const estimatedTimeMs =
      totalTimeMs * (this.requiredReadingTimePercent / 100);

    // console.log(
    //   `Total reading time: ${readingTime} min, Required time: ${
    //     estimatedTimeMs / 1000
    //   }s`
    // ); // TEST

    this.interval = setInterval(() => {
      this.timeSpent += 1000;

      // console.log(`Time Spent: ${this.timeSpent / 1000}s`); // TEST

      if (this.timeSpent >= estimatedTimeMs) {
        // console.log("✅ Time requirement met"); // TEST

        this.timeSpentReached = true;
        clearInterval(this.interval);
        this.checkIfRead();
      }
    }, 1000);
  }

  // Track scroll progress
  trackScrollProgress() {
    this.handleScroll = () => {
      var scrollTop = window.scrollY;
      var elementTop = this.element.offsetTop;
      var elementHeight = this.element.offsetHeight;
      var winHeight = window.innerHeight;

      var scrollAmount = scrollTop - elementTop;
      var scrollPercent = scrollAmount / (elementHeight - winHeight);
      var scrollPercentRounded = Math.round(scrollPercent * 100);

      scrollPercentRounded = Math.max(0, Math.min(scrollPercentRounded, 100));

      // console.log(`📜 Scroll progress: ${scrollPercentRounded}%`); // TEST

      if (scrollPercentRounded >= this.requiredScrollPercent) {
        // console.log("✅ Scroll requirement met"); // TEST

        this.scrollReached = true;
        this.checkIfRead();
        window.removeEventListener("scroll", this.handleScroll);
      }
    };

    window.addEventListener("scroll", this.handleScroll);
  }

  // Initialize the tracking process
  startTracking() {
    // console.log("🚀 Tracking started"); // TEST

    this.startReadingTimer();
    this.trackScrollProgress();
  }

  // Stop tracking if needed
  stopTracking() {
    // console.log("🛑 Tracking stopped"); // TEST

    if (this.interval) clearInterval(this.interval);

    if (this.handleScroll)
      window.removeEventListener("scroll", this.handleScroll);
  }

  getStatus() {
    // console.log("📊 Status Check:", {
    //   totalEstimatedTime: this.calculateReadingTime(),
    //   timeSpent: this.timeSpent / 60000,
    //   scrollReached: this.scrollReached,
    //   readCompleted: this.readCompleted,
    // }); // TEST

    return {
      totalEstimatedTime: this.calculateReadingTime(), // in milliseconds
      timeSpent: this.timeSpent / 60000,
      scrollReached: this.scrollReached,
      readCompleted: this.readCompleted,
    };
  }
}

export default BlogReadTracker;
