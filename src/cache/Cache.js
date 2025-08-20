import API from "../api.js";

let cacheDocuments = null;
let cacheAnalytics = null;


export const fetchDocumentsOnce = async (val) =>{
    if (cacheDocuments && !val) return cacheDocuments

    const res = await API.get("/documents");
    cacheDocuments = res.data;
    return cacheDocuments;
}

export const fetchAnalyticsOnce = async () =>{
    if (cacheAnalytics) return cacheAnalytics;

    const res = await API.get("/questions/analytics");
    cacheAnalytics = res.data;
    return cacheAnalytics;
}

export const resetCache = () => {
    cacheDocuments = null;
    cacheAnalytics = null;
}