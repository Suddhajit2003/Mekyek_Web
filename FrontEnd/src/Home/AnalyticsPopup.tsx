import React, { useState, useEffect } from 'react';
import { FaTimes, FaDownload, FaShare, FaCalendarAlt, FaMapMarkerAlt, FaIndustry, FaMoneyBillWave } from 'react-icons/fa';
import styles from './Css/AnalyticsPopup.module.css';

interface AnalyticsData {
  applications: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    trend: number;
  };
  interviews: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    trend: number;
  };
  savedJobs: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    trend: number;
  };
  viewedJobs: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    trend: number;
  };
  monthlyData: {
    month: string;
    applications: number;
    interviews: number;
    saved: number;
    viewed: number;
  }[];
  topIndustries: {
    industry: string;
    applications: number;
    percentage: number;
  }[];
  topLocations: {
    location: string;
    applications: number;
    percentage: number;
  }[];
  salaryRange: {
    range: string;
    applications: number;
    percentage: number;
  }[];
  applicationStatus: {
    status: string;
    count: number;
    percentage: number;
  }[];
}

interface AnalyticsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  jobStats: {
    applied: number;
    saved: number;
    viewed: number;
    interviews: number;
  };
}

const AnalyticsPopup: React.FC<AnalyticsPopupProps> = ({ isOpen, onClose, jobStats }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('3months');

  // Mock analytics data
  const analyticsData: AnalyticsData = {
    applications: {
      total: jobStats.applied,
      thisMonth: 12,
      lastMonth: 8,
      trend: 50
    },
    interviews: {
      total: jobStats.interviews,
      thisMonth: 4,
      lastMonth: 2,
      trend: 100
    },
    savedJobs: {
      total: jobStats.saved,
      thisMonth: 15,
      lastMonth: 12,
      trend: 25
    },
    viewedJobs: {
      total: jobStats.viewed,
      thisMonth: 45,
      lastMonth: 38,
      trend: 18
    },
    monthlyData: [
      { month: 'Jan', applications: 8, interviews: 2, saved: 12, viewed: 35 },
      { month: 'Feb', applications: 12, interviews: 4, saved: 15, viewed: 42 },
      { month: 'Mar', applications: 15, interviews: 6, saved: 18, viewed: 48 },
      { month: 'Apr', applications: 10, interviews: 3, saved: 14, viewed: 40 },
      { month: 'May', applications: 18, interviews: 7, saved: 22, viewed: 55 },
      { month: 'Jun', applications: 22, interviews: 9, saved: 25, viewed: 60 }
    ],
    topIndustries: [
      { industry: 'Technology', applications: 45, percentage: 45 },
      { industry: 'Healthcare', applications: 20, percentage: 20 },
      { industry: 'Finance', applications: 15, percentage: 15 },
      { industry: 'Education', applications: 10, percentage: 10 },
      { industry: 'Other', applications: 10, percentage: 10 }
    ],
    topLocations: [
      { location: 'San Francisco', applications: 30, percentage: 30 },
      { location: 'New York', applications: 25, percentage: 25 },
      { location: 'Remote', applications: 20, percentage: 20 },
      { location: 'Austin', applications: 15, percentage: 15 },
      { location: 'Other', applications: 10, percentage: 10 }
    ],
    salaryRange: [
      { range: '$50k-75k', applications: 20, percentage: 20 },
      { range: '$75k-100k', applications: 35, percentage: 35 },
      { range: '$100k-125k', applications: 25, percentage: 25 },
      { range: '$125k+', applications: 20, percentage: 20 }
    ],
    applicationStatus: [
      { status: 'Applied', count: 45, percentage: 45 },
      { status: 'Interview', count: 15, percentage: 15 },
      { status: 'Rejected', count: 25, percentage: 25 },
      { status: 'Pending', count: 15, percentage: 15 }
    ]
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const getTrendColor = (trend: number) => {
    return trend >= 0 ? '#28a745' : '#dc3545';
  };

  const getTrendIcon = (trend: number) => {
    return trend >= 0 ? '↗' : '↘';
  };

  const renderOverviewTab = () => (
    <div className={styles.overviewTab}>
      {/* Key Metrics */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <h3>Applications</h3>
            <span className={styles.trend} style={{ color: getTrendColor(analyticsData.applications.trend) }}>
              {getTrendIcon(analyticsData.applications.trend)} {analyticsData.applications.trend}%
            </span>
          </div>
          <div className={styles.metricValue}>{formatNumber(analyticsData.applications.total)}</div>
          <div className={styles.metricSubtext}>
            {analyticsData.applications.thisMonth} this month
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <h3>Interviews</h3>
            <span className={styles.trend} style={{ color: getTrendColor(analyticsData.interviews.trend) }}>
              {getTrendIcon(analyticsData.interviews.trend)} {analyticsData.interviews.trend}%
            </span>
          </div>
          <div className={styles.metricValue}>{formatNumber(analyticsData.interviews.total)}</div>
          <div className={styles.metricSubtext}>
            {analyticsData.interviews.thisMonth} this month
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <h3>Saved Jobs</h3>
            <span className={styles.trend} style={{ color: getTrendColor(analyticsData.savedJobs.trend) }}>
              {getTrendIcon(analyticsData.savedJobs.trend)} {analyticsData.savedJobs.trend}%
            </span>
          </div>
          <div className={styles.metricValue}>{formatNumber(analyticsData.savedJobs.total)}</div>
          <div className={styles.metricSubtext}>
            {analyticsData.savedJobs.thisMonth} this month
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <h3>Viewed Jobs</h3>
            <span className={styles.trend} style={{ color: getTrendColor(analyticsData.viewedJobs.trend) }}>
              {getTrendIcon(analyticsData.viewedJobs.trend)} {analyticsData.viewedJobs.trend}%
            </span>
          </div>
          <div className={styles.metricValue}>{formatNumber(analyticsData.viewedJobs.total)}</div>
          <div className={styles.metricSubtext}>
            {analyticsData.viewedJobs.thisMonth} this month
          </div>
        </div>
      </div>

      {/* Monthly Trend Chart */}
      <div className={styles.chartContainer}>
        <h3>Monthly Activity</h3>
        <div className={styles.chart}>
          <div className={styles.chartBars}>
            {analyticsData.monthlyData.map((data, index) => (
              <div key={data.month} className={styles.chartBarGroup}>
                <div className={styles.chartBar}>
                  <div 
                    className={styles.bar} 
                    style={{ height: `${(data.applications / 25) * 100}%` }}
                    title={`${data.applications} applications`}
                  ></div>
                  <div 
                    className={styles.bar} 
                    style={{ height: `${(data.interviews / 10) * 100}%` }}
                    title={`${data.interviews} interviews`}
                  ></div>
                  <div 
                    className={styles.bar} 
                    style={{ height: `${(data.saved / 30) * 100}%` }}
                    title={`${data.saved} saved`}
                  ></div>
                  <div 
                    className={styles.bar} 
                    style={{ height: `${(data.viewed / 70) * 100}%` }}
                    title={`${data.viewed} viewed`}
                  ></div>
                </div>
                <span className={styles.chartLabel}>{data.month}</span>
              </div>
            ))}
          </div>
          <div className={styles.chartLegend}>
            <div className={styles.legendItem}>
              <div className={styles.legendColor} style={{ backgroundColor: '#0077b5' }}></div>
              <span>Applications</span>
            </div>
            <div className={styles.legendItem}>
              <div className={styles.legendColor} style={{ backgroundColor: '#28a745' }}></div>
              <span>Interviews</span>
            </div>
            <div className={styles.legendItem}>
              <div className={styles.legendColor} style={{ backgroundColor: '#ffc107' }}></div>
              <span>Saved</span>
            </div>
            <div className={styles.legendItem}>
              <div className={styles.legendColor} style={{ backgroundColor: '#6c757d' }}></div>
              <span>Viewed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIndustriesTab = () => (
    <div className={styles.industriesTab}>
      <div className={styles.pieChartContainer}>
        <h3>Applications by Industry</h3>
        <div className={styles.pieChart}>
          {analyticsData.topIndustries.map((industry, index) => {
            const colors = ['#0077b5', '#28a745', '#ffc107', '#dc3545', '#6c757d'];
            const rotation = index === 0 ? 0 : 
              analyticsData.topIndustries.slice(0, index).reduce((acc, item) => acc + (item.percentage * 3.6), 0);
            
            return (
              <div
                key={industry.industry}
                className={styles.pieSlice}
                style={{
                  transform: `rotate(${rotation}deg)`,
                  backgroundColor: colors[index % colors.length]
                }}
                title={`${industry.industry}: ${industry.applications} applications (${industry.percentage}%)`}
              >
                <div className={styles.sliceLabel}>{industry.industry}</div>
              </div>
            );
          })}
        </div>
        <div className={styles.pieLegend}>
          {analyticsData.topIndustries.map((industry, index) => {
            const colors = ['#0077b5', '#28a745', '#ffc107', '#dc3545', '#6c757d'];
            return (
              <div key={industry.industry} className={styles.legendItem}>
                <div className={styles.legendColor} style={{ backgroundColor: colors[index % colors.length] }}></div>
                <span>{industry.industry}</span>
                <span className={styles.legendValue}>{industry.applications}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderLocationsTab = () => (
    <div className={styles.locationsTab}>
      <div className={styles.barChartContainer}>
        <h3>Applications by Location</h3>
        <div className={styles.barChart}>
          {analyticsData.topLocations.map((location, index) => (
            <div key={location.location} className={styles.barChartItem}>
              <div className={styles.barChartLabel}>{location.location}</div>
              <div className={styles.barChartBar}>
                <div 
                  className={styles.barChartFill}
                  style={{ width: `${location.percentage}%` }}
                ></div>
              </div>
              <div className={styles.barChartValue}>
                {location.applications} ({location.percentage}%)
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSalaryTab = () => (
    <div className={styles.salaryTab}>
      <div className={styles.salaryChartContainer}>
        <h3>Applications by Salary Range</h3>
        <div className={styles.salaryChart}>
          {analyticsData.salaryRange.map((range, index) => (
            <div key={range.range} className={styles.salaryBar}>
              <div className={styles.salaryLabel}>{range.range}</div>
              <div className={styles.salaryBarContainer}>
                <div 
                  className={styles.salaryBarFill}
                  style={{ width: `${range.percentage}%` }}
                ></div>
              </div>
              <div className={styles.salaryValue}>
                {range.applications} ({range.percentage}%)
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStatusTab = () => (
    <div className={styles.statusTab}>
      <div className={styles.statusChartContainer}>
        <h3>Application Status Distribution</h3>
        <div className={styles.statusChart}>
          {analyticsData.applicationStatus.map((status, index) => {
            const colors = ['#0077b5', '#28a745', '#dc3545', '#ffc107'];
            return (
              <div key={status.status} className={styles.statusItem}>
                <div className={styles.statusHeader}>
                  <div className={styles.statusColor} style={{ backgroundColor: colors[index % colors.length] }}></div>
                  <span className={styles.statusName}>{status.status}</span>
                  <span className={styles.statusCount}>{status.count}</span>
                </div>
                <div className={styles.statusBar}>
                  <div 
                    className={styles.statusBarFill}
                    style={{ 
                      width: `${status.percentage}%`,
                      backgroundColor: colors[index % colors.length]
                    }}
                  ></div>
                </div>
                <span className={styles.statusPercentage}>{status.percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.popupHeader}>
          <div className={styles.headerLeft}>
            <h2>Job Analytics</h2>
            <div className={styles.timeRangeSelector}>
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className={styles.timeSelect}
              >
                <option value="1month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
            </div>
          </div>
          <div className={styles.headerRight}>
            <button className={styles.actionButton}>
              <FaDownload /> Export
            </button>
            <button className={styles.actionButton}>
              <FaShare /> Share
            </button>
            <button className={styles.closeButton} onClick={onClose}>
              <FaTimes />
            </button>
          </div>
        </div>

        <div className={styles.popupTabs}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'overview' ? styles.active : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'industries' ? styles.active : ''}`}
            onClick={() => setActiveTab('industries')}
          >
            <FaIndustry /> Industries
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'locations' ? styles.active : ''}`}
            onClick={() => setActiveTab('locations')}
          >
            <FaMapMarkerAlt /> Locations
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'salary' ? styles.active : ''}`}
            onClick={() => setActiveTab('salary')}
          >
            <FaMoneyBillWave /> Salary
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'status' ? styles.active : ''}`}
            onClick={() => setActiveTab('status')}
          >
            <FaCalendarAlt /> Status
          </button>
        </div>

        <div className={styles.popupContent}>
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'industries' && renderIndustriesTab()}
          {activeTab === 'locations' && renderLocationsTab()}
          {activeTab === 'salary' && renderSalaryTab()}
          {activeTab === 'status' && renderStatusTab()}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPopup; 