import React, { useState } from 'react';
import styles from './Css/Home.module.css';
import Post from './Post';
import PostCreation from './PostCreation';
import AnalyticsPopup from './AnalyticsPopup';
import { useAuth, useFeeds, useNews, useEvents } from '../hooks/useApi';
import { apiService } from '../api'; 