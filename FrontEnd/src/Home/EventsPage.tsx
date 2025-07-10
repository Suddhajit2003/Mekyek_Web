import React from 'react';
import styles from './Css/Post.module.css';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaTicketAlt } from 'react-icons/fa';

const mockBookedEvents = [
  {
    id: 1,
    title: "Tech Conference 2024",
    description: "Annual technology conference featuring industry leaders and networking opportunities",
    date: "March 15, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "San Francisco Convention Center",
    status: "Confirmed",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Startup Networking Meetup",
    description: "Connect with fellow entrepreneurs and potential investors",
    date: "March 22, 2024",
    time: "6:00 PM - 9:00 PM",
    location: "Innovation Hub, Downtown",
    status: "Confirmed",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Design Workshop",
    description: "Hands-on UX/UI design workshop with expert designers",
    date: "April 5, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Design Studio, Tech District",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Career Fair 2024",
    description: "Meet top companies and explore job opportunities",
    date: "April 12, 2024",
    time: "11:00 AM - 6:00 PM",
    location: "City Convention Hall",
    status: "Confirmed",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
  }
];

export default function EventsPage() {
  const navigate = useNavigate();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return '#10b981';
      case 'Pending':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className={styles.friendsPageContainer}>
      <div className={styles.friendsPageHeader}>
        <h2>My Booked Events</h2>
        <button className={styles.quickAccessButton} onClick={() => navigate(-1)}>Back</button>
      </div>
      <div className={styles.friendsGrid}>
        {mockBookedEvents.map((event) => (
          <div className={styles.friendCard} key={event.id}>
            <div 
              className={styles.friendAvatar} 
              style={{ 
                backgroundImage: `url(${event.image})`,
                borderRadius: '12px',
                width: '100%',
                height: '160px',
                marginBottom: '16px'
              }} 
            />
            <div className={styles.friendInfo}>
              <div className={styles.friendName}>{event.title}</div>
              <div className={styles.friendTitle}>{event.description}</div>
              
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#64748b' }}>
                  <FaCalendarAlt style={{ color: '#0077b5' }} />
                  {event.date}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#64748b' }}>
                  <FaClock style={{ color: '#0077b5' }} />
                  {event.time}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#64748b' }}>
                  <FaMapMarkerAlt style={{ color: '#0077b5' }} />
                  {event.location}
                </div>
              </div>
            </div>
            <div className={styles.friendActions}>
              <div 
                style={{ 
                  padding: '6px 12px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  fontWeight: '600',
                  backgroundColor: getStatusColor(event.status) + '20',
                  color: getStatusColor(event.status),
                  border: `1px solid ${getStatusColor(event.status)}`
                }}
              >
                {event.status}
              </div>
              <button className={styles.friendActionBtn}>
                <FaTicketAlt style={{ marginRight: '6px' }} />
                View Ticket
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 