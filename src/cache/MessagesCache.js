let cachedMessages = [];
let cachedPage = 1;
let cachedHasMore = true;

export const fetchMessagesOnce = async (pageNum, limit, fetchFn) => {
    // If page already fetched
    if (pageNum < cachedPage) {
        return {
            messages: cachedMessages,
            hasMore: cachedHasMore,
        };
    }

    const res = await fetchFn(pageNum, limit);
    const data = res || [];

    const formatted = data
        .reverse()
        .map((q) => [
            { role: "user", text: q.question },
            { role: "bot", text: q.answer },
        ])
        .flat();

    cachedMessages = [...formatted, ...cachedMessages];
    cachedPage = pageNum + 1;
    if (data.length === 0) cachedHasMore = false;

    return { messages: cachedMessages, hasMore: cachedHasMore };
};

export const appendMessageToCache = (msg) => {
    cachedMessages = [...cachedMessages, msg];
};

export const resetMessagesCache = () => {
    cachedMessages = [];
    cachedPage = 1;
    cachedHasMore = true;
};
