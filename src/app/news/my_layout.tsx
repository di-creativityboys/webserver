"use client";

import * as React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { type articles as Article } from "@prisma/client";
import ArticlesLayout from "./articles/my_layout";
import { SingletonStorage } from "~/client/SingletonStorage";
import { type Cluster } from "~/types";
import TopicsLayout from "./topics/my_layout";

type MyProps = {
    children?: React.ReactNode;
    articles: Article[];
    cluster: Cluster[];
};

export default function NewsLayout({ articles, cluster }: MyProps) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);

        //Store in local storage for derive prompt
        SingletonStorage.getInstance().selectedArticle = null;
        SingletonStorage.getInstance().selectedTopic = null;
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="Articles" {...a11yProps(0)} />
                    <Tab label="Topics" {...a11yProps(1)} />
                </Tabs>
            </Box>
            {value === 0 ? (
                <ArticlesLayout articles={articles} />
            ) : (
                <TopicsLayout cluster={cluster} />
            )}
        </>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
