import React, { useState } from 'react';
import styles from './Css/EventElement.module.css';
import { useEvents, useAuth } from '../hooks/useApi';
import { apiService } from '../api';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attendees: string;
  image: string;
}

interface RecommendedEvent {
  id: number;
  title: string;
  date: string;
  image: string;
}

const EventElement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [startDate, setStartDate] = useState('May 20');
  const [endDate, setEndDate] = useState('Jun 20');
  const [searchLocation, setSearchLocation] = useState('');
  
  // Popup states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [isStartDatePicker, setIsStartDatePicker] = useState(true);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [selectedEventDetails, setSelectedEventDetails] = useState<RecommendedEvent | null>(null);
  const [tempLocation, setTempLocation] = useState('');
  const [showEventDetailsPopup, setShowEventDetailsPopup] = useState(false);
  const [eventDetailsData, setEventDetailsData] = useState<Event | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: '', email: '', phone: '' });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const events: Event[] = [
    {
      id: 1,
      title: 'Tech Conference 2025',
      date: 'May 25-27, 2025',
      time: '9:00 AM - 5:00 PM',
      location: 'San Francisco Convention Center',
      description: 'Join the biggest tech conference of the year featuring keynotes from industry leaders, workshops, and networking opportunities.',
      attendees: '1250 attending',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Career Development Workshop',
      date: 'Jun 5, 2025',
      time: '1:00 PM - 3:00 PM',
      location: 'Virtual',
      description: 'Boost your career with expert advice on resume building, interview skills, and professional development strategies.',
      attendees: '850 attending',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Digital Marketing Summit',
      date: 'Jun 18, 2025',
      time: '1:00 PM - 3:00 PM',
      location: 'Innovation Hub, Boston',
      description: 'Explore the latest trends and strategies in digital marketing with keynotes from industry leaders and hands-on workshops.',
      attendees: '950 attending',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Startup Pitch Competition',
      date: 'Jun 22, 2025',
      time: '2:00 PM - 5:00 PM',
      location: 'Virtual',
      description: 'Watch innovative startups pitch their ideas to a panel of investors and industry experts. Networking reception to follow.',
      attendees: '650 attending',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop'
    }
  ];

  const recommendedEvents: RecommendedEvent[] = [
    {
      id: 1,
      title: 'Product Management Masterclass',
      date: 'Jun 10 • Virtual',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200&h=120&fit=crop'
    },
    {
      id: 2,
      title: 'Cybersecurity Conference',
      date: 'Jul 15 • Washington DC',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=120&fit=crop'
    },
    {
      id: 3,
      title: 'Remote Work Summit',
      date: 'Jun 22 • Virtual',
      image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=200&h=120&fit=crop'
    }
  ];

  const categories = [
    'All',
    'Technology',
    'Business',
    'Design',
    'Marketing',
    'Networking',
    'Career'
  ];

  const handleRegister = (eventId: number) => {
    setConfirmationMessage(`Successfully registered for event ${eventId}!`);
    setShowConfirmation(true);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleTabChange = (tab: 'upcoming' | 'past') => {
    setActiveTab(tab);
  };

  const handleLocationClick = () => {
    setTempLocation(searchLocation);
    setShowLocationSearch(true);
  };

  const handleCategoryFilterClick = () => {
    const currentIndex = categories.indexOf(selectedCategory);
    const nextIndex = (currentIndex + 1) % categories.length;
    setSelectedCategory(categories[nextIndex]);
  };

  const handleDateClick = (isStartDate: boolean) => {
    setIsStartDatePicker(isStartDate);
    setShowDatePicker(true);
  };

  const handleRecommendedEventClick = (eventId: number) => {
    const event = recommendedEvents.find(e => e.id === eventId);
    if (event) {
      setSelectedEventDetails(event);
      setShowEventDetails(true);
    }
  };

  const handleDateConfirm = (date: string) => {
    if (isStartDatePicker) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    setShowDatePicker(false);
  };

  const handleLocationConfirm = () => {
    setSearchLocation(tempLocation);
    setShowLocationSearch(false);
  };

  const closeAllPopups = () => {
    setShowDatePicker(false);
    setShowLocationSearch(false);
    setShowConfirmation(false);
    setShowEventDetails(false);
    setShowEventDetailsPopup(false);
    setShowBookingForm(false);
    setBookingSuccess(false);
  };

  const handleEventCardRegister = (event: Event) => {
    setEventDetailsData(event);
    setShowEventDetailsPopup(true);
  };

  const handlePopupRegister = () => {
    setShowBookingForm(true);
  };

  const handleBookingInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setShowBookingForm(false);
      setShowEventDetailsPopup(false);
      setBookingSuccess(false);
      setBookingForm({ name: '', email: '', phone: '' });
    }, 1800);
  };

  const CalendarIcon = () => (
    <div className={styles.calendarIcon}></div>
  );

  const LocationIcon = () => (
    <div className={styles.locationIcon}></div>
  );

  const CategoryIcon = () => (
    <div className={styles.categoryIcon}></div>
  );

  return (
    <div className={styles.eventsContainer}>
      {/* Left Sidebar */}
      <div className={styles.leftSidebar}>
        {/* Event Categories */}
        <div className={styles.eventCategories}>
          <h3 className={styles.categoriesTitle}>Event Categories</h3>
          <div className={styles.categoriesList}>
            {categories.map((category) => (
              <p 
                key={category} 
                className={styles.categoryItem}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </p>
            ))}
          </div>
        </div>

        {/* Your Events */}
        <div className={styles.yourEvents}>
          <h3 className={styles.yourEventsTitle}>Your Events</h3>
          <div className={styles.yourEventsList}>
            <div className={styles.yourEventsItem}>
              <p className={styles.yourEventsItemLabel}>Registered Events</p>
              <div className={styles.yourEventsItemCount}>
                <p className={styles.yourEventsItemNumber}>0</p>
              </div>
            </div>
            <div className={styles.yourEventsItem}>
              <p className={styles.yourEventsItemLabel}>Saved Events</p>
              <div className={styles.yourEventsItemCount}>
                <p className={styles.yourEventsItemNumber}>12</p>
              </div>
            </div>
            <div className={styles.yourEventsItem}>
              <p className={styles.yourEventsItemLabel}>Past Events</p>
              <div className={styles.yourEventsItemCount}>
                <p className={styles.yourEventsItemNumber}>9</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <h1 className={styles.eventsTitle}>Events</h1>
          <p className={styles.eventsSubtitle}>
            Discover and connect with like-minded professionals at events
          </p>
        </div>

        {/* Create Events Button */}
        {/* <div className={styles.createEventsButton} onClick={() => alert('Create Event functionality')}>
          Create Event
        </div> */}

        {/* Location and Category Filters */}
        <div className={styles.locationFilter} onClick={handleLocationClick}>
          <LocationIcon />
          <p className={styles.locationText}>
            {searchLocation || 'Search location...'}
          </p>
        </div>
        <div className={styles.categoryFilter} onClick={handleCategoryFilterClick}>
          <CategoryIcon />
          <p className={styles.categoryText}>Category: {selectedCategory}</p>
        </div>

        {/* Date Range Section */}
        <div className={styles.dateRangeSection}>
          <div className={styles.datePicker} onClick={() => handleDateClick(true)}>
            <p className={styles.dateText}>{startDate}</p>
            <CalendarIcon />
          </div>
          <p className={styles.toText}>to</p>
          <div className={styles.datePicker} onClick={() => handleDateClick(false)}>
            <p className={styles.dateText}>{endDate}</p>
            <CalendarIcon />
          </div>
        </div>

        {/* Events Tab Section */}
        <div className={styles.eventsTabSection}>
          <button
            className={activeTab === 'upcoming' ? styles.tabActive : styles.tabInactive}
            onClick={() => handleTabChange('upcoming')}
          >
            <p className={activeTab === 'upcoming' ? styles.tabTextActive : styles.tabTextInactive}>
              Upcoming Events
            </p>
          </button>
          <button
            className={activeTab === 'past' ? styles.tabActive : styles.tabInactive}
            onClick={() => handleTabChange('past')}
          >
            <p className={activeTab === 'past' ? styles.tabTextActive : styles.tabTextInactive}>
              Past Events
            </p>
          </button>
        </div>

        {/* Event Cards */}
        {events.map((event, index) => (
          <div key={event.id} className={`${styles.eventCard} ${styles[`eventCard${index + 1}`]}`}>
            <div 
              className={styles.eventImage}
              style={{
                backgroundImage: `url(${event.image})`,
                backgroundColor: '#f0f0f0'
              }}
            ></div>
            <div className={styles.eventContent}>
              <div className={styles.eventDetails}>
                <div className={styles.eventHeader}>
                  <div className={styles.eventTitleSection}>
                    <h3 className={styles.eventTitle}>{event.title}</h3>
                    <p className={styles.eventDate}>{event.date}</p>
                  </div>
                  <p className={styles.eventTime}>{event.time}</p>
                </div>
                <div className={styles.eventInfo}>
                  <p className={styles.eventLocation}>{event.location}</p>
                  <p className={styles.eventDescription}>{event.description}</p>
                  <p className={styles.eventAttendees}>{event.attendees}</p>
                </div>
              </div>
              <div className={styles.eventFooter}>
                <button 
                  className={styles.registerButton}
                  onClick={() => handleEventCardRegister(event)}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Sidebar */}
      <div className={styles.rightSidebar}>
        {/* Recommended Events */}
        <div className={styles.recommendedEvents}>
          <h3 className={styles.recommendedTitle}>Recommended for you</h3>
          <div className={styles.recommendedList}>
            {recommendedEvents.map((event) => (
              <div key={event.id} className={styles.recommendedItem} onClick={() => handleRecommendedEventClick(event.id)}>
                <div 
                  className={styles.recommendedImage}
                  style={{
                    backgroundImage: `url(${event.image})`,
                    backgroundColor: '#f0f0f0'
                  }}
                ></div>
                <div className={styles.recommendedContent}>
                  <p className={styles.recommendedItemTitle}>{event.title}</p>
                  <p className={styles.recommendedItemDate}>{event.date}</p>
                  <p className={styles.recommendedItemLink}>View details</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup Overlays */}
      {(showDatePicker || showLocationSearch || showConfirmation || showEventDetails || showEventDetailsPopup || showBookingForm) && (
        <div className={styles.popupOverlay} onClick={closeAllPopups}>
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            
            {/* Date Picker Popup */}
            {showDatePicker && (
              <div className={styles.datePickerPopup}>
                <h3 className={styles.popupTitle}>
                  Select {isStartDatePicker ? 'Start' : 'End'} Date
                </h3>
                <div className={styles.datePickerGrid}>
                  <div className={styles.monthSelector}>
                    <button onClick={() => handleDateConfirm('Jan 15')}>Jan 15</button>
                    <button onClick={() => handleDateConfirm('Feb 20')}>Feb 20</button>
                    <button onClick={() => handleDateConfirm('Mar 25')}>Mar 25</button>
                    <button onClick={() => handleDateConfirm('Apr 10')}>Apr 10</button>
                    <button onClick={() => handleDateConfirm('May 20')}>May 20</button>
                    <button onClick={() => handleDateConfirm('Jun 15')}>Jun 15</button>
                    <button onClick={() => handleDateConfirm('Jul 25')}>Jul 25</button>
                    <button onClick={() => handleDateConfirm('Aug 30')}>Aug 30</button>
                    <button onClick={() => handleDateConfirm('Sep 10')}>Sep 10</button>
                    <button onClick={() => handleDateConfirm('Oct 20')}>Oct 20</button>
                    <button onClick={() => handleDateConfirm('Nov 15')}>Nov 15</button>
                    <button onClick={() => handleDateConfirm('Dec 25')}>Dec 25</button>
                  </div>
                </div>
                <div className={styles.popupActions}>
                  <button className={styles.cancelButton} onClick={closeAllPopups}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Location Search Popup */}
            {showLocationSearch && (
              <div className={styles.locationSearchPopup}>
                <h3 className={styles.popupTitle}>Search Location</h3>
                <input
                  type="text"
                  className={styles.locationInput}
                  placeholder="Enter location..."
                  value={tempLocation}
                  onChange={(e) => setTempLocation(e.target.value)}
                />
                <div className={styles.locationSuggestions}>
                  <div className={styles.suggestionItem} onClick={() => setTempLocation('New York, NY')}>
                    📍 New York, NY
                  </div>
                  <div className={styles.suggestionItem} onClick={() => setTempLocation('San Francisco, CA')}>
                    📍 San Francisco, CA
                  </div>
                  <div className={styles.suggestionItem} onClick={() => setTempLocation('Los Angeles, CA')}>
                    📍 Los Angeles, CA
                  </div>
                  <div className={styles.suggestionItem} onClick={() => setTempLocation('Chicago, IL')}>
                    📍 Chicago, IL
                  </div>
                  <div className={styles.suggestionItem} onClick={() => setTempLocation('Virtual')}>
                    🌐 Virtual
                  </div>
                </div>
                <div className={styles.popupActions}>
                  <button className={styles.cancelButton} onClick={closeAllPopups}>
                    Cancel
                  </button>
                  <button className={styles.confirmButton} onClick={handleLocationConfirm}>
                    Confirm
                  </button>
                </div>
              </div>
            )}

            {/* Confirmation Popup */}
            {showConfirmation && (
              <div className={styles.confirmationPopup}>
                <div className={styles.successIcon}>✓</div>
                <p className={styles.confirmationMessage}>{confirmationMessage}</p>
                <div className={styles.popupActions}>
                  <button className={styles.confirmButton} onClick={closeAllPopups}>
                    OK
                  </button>
                </div>
              </div>
            )}

            {/* Event Details Popup */}
            {showEventDetailsPopup && eventDetailsData && (
              <div className={styles.popupOverlay} onClick={closeAllPopups}>
                <div
                  className={styles.popupContent}
                  onClick={e => e.stopPropagation()}
                  style={{
                    maxWidth: 720,
                    minWidth: 340,
                    background: '#fff',
                    borderRadius: 22,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.16)',
                    padding: 0,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                  }}
                >
                  <button className={styles.closeBtn} onClick={closeAllPopups} aria-label="Close" style={{position: 'absolute', top: 18, right: 28, zIndex: 2}}>&times;</button>
                  <div style={{width: '100%', height: 240, background: `url(${eventDetailsData.image}) center/cover`, borderTopLeftRadius: 22, borderTopRightRadius: 22}}></div>
                  <div style={{padding: '32px 36px 28px 36px', display: 'flex', flexDirection: 'column', gap: 18}}>
                    <h2 style={{margin: 0, fontSize: 32, color: '#003F88', fontWeight: 700}}>{eventDetailsData.title}</h2>
                    <div style={{color: '#003F88', fontWeight: 600, fontSize: 18}}>{eventDetailsData.date} • {eventDetailsData.time}</div>
                    <div style={{color: '#666', fontSize: 17, marginBottom: 8}}>{eventDetailsData.location}</div>
                    <div style={{color: '#222', fontSize: 18, margin: '8px 0', lineHeight: 1.6}}>{eventDetailsData.description}</div>
                    <div style={{color: '#003F88', fontWeight: 600, fontSize: 16, marginBottom: 8}}>{eventDetailsData.attendees}</div>
                    <div style={{width: '100%', marginTop: 16, display: 'flex', justifyContent: 'flex-end'}}>
                      <button className={styles.registerButton} style={{fontSize: 20, padding: '12px 40px', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,63,136,0.08)'}} onClick={handlePopupRegister}>Register</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Booking Form Popup */}
            {showBookingForm && (
              <div className={styles.popupOverlay} onClick={closeAllPopups}>
                <div
                  className={styles.popupContent}
                  onClick={e => e.stopPropagation()}
                  style={{
                    maxWidth: 480,
                    minWidth: 320,
                    background: '#fff',
                    borderRadius: 20,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                    padding: 0,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    position: 'relative',
                  }}
                >
                  <div style={{height: 8, background: '#003F88', width: '100%'}}></div>
                  <button className={styles.closeBtn} onClick={closeAllPopups} aria-label="Close" style={{position: 'absolute', top: 18, right: 28, zIndex: 2, fontSize: 28}}>&times;</button>
                  <div style={{padding: '32px 28px 28px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
                    <h2 style={{margin: 0, fontSize: 26, color: '#003F88', fontWeight: 700, letterSpacing: 0.5}}>Event Registration</h2>
                    <div style={{fontSize: 15, color: '#666', marginBottom: 18, textAlign: 'center'}}>Fill in your details to enroll for this event. We'll send you a confirmation email.</div>
                    {!bookingSuccess ? (
                      <form onSubmit={handleBookingSubmit} style={{width: '100%', display: 'flex', flexDirection: 'column', gap: 18}}>
                        <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
                          <div style={{position: 'relative'}}>
                            <input name="name" type="text" required value={bookingForm.name} onChange={handleBookingInput} style={{width: '100%', padding: '18px 12px 8px 12px', borderRadius: 10, border: '1.5px solid #e1e5e9', fontSize: 16, background: 'none', outline: 'none', transition: 'border 0.2s'}} />
                            <label style={{position: 'absolute', left: 14, top: bookingForm.name ? 6 : 18, fontSize: bookingForm.name ? 12 : 16, color: bookingForm.name ? '#003F88' : '#888', background: '#fff', padding: '0 4px', transition: 'all 0.2s', pointerEvents: 'none'}}>Your Name</label>
                          </div>
                          <div style={{position: 'relative'}}>
                            <input name="email" type="email" required value={bookingForm.email} onChange={handleBookingInput} style={{width: '100%', padding: '18px 12px 8px 12px', borderRadius: 10, border: '1.5px solid #e1e5e9', fontSize: 16, background: 'none', outline: 'none', transition: 'border 0.2s'}} />
                            <label style={{position: 'absolute', left: 14, top: bookingForm.email ? 6 : 18, fontSize: bookingForm.email ? 12 : 16, color: bookingForm.email ? '#003F88' : '#888', background: '#fff', padding: '0 4px', transition: 'all 0.2s', pointerEvents: 'none'}}>Email</label>
                          </div>
                          <div style={{position: 'relative'}}>
                            <input name="phone" type="tel" required value={bookingForm.phone} onChange={handleBookingInput} style={{width: '100%', padding: '18px 12px 8px 12px', borderRadius: 10, border: '1.5px solid #e1e5e9', fontSize: 16, background: 'none', outline: 'none', transition: 'border 0.2s'}} />
                            <label style={{position: 'absolute', left: 14, top: bookingForm.phone ? 6 : 18, fontSize: bookingForm.phone ? 12 : 16, color: bookingForm.phone ? '#003F88' : '#888', background: '#fff', padding: '0 4px', transition: 'all 0.2s', pointerEvents: 'none'}}>Phone Number</label>
                          </div>
                        </div>
                        <button type="submit" className={styles.registerButton} style={{fontSize: 18, marginTop: 8, borderRadius: 10, background: '#003F88', color: '#fff', boxShadow: '0 2px 8px rgba(0,63,136,0.08)', fontWeight: 600, letterSpacing: 0.5, padding: '14px 0', width: '100%', transition: 'background 0.2s'}}>Enroll</button>
                      </form>
                    ) : (
                      <div style={{textAlign: 'center', color: '#4CAF50', fontWeight: 600, fontSize: 22, marginTop: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
                        <div style={{fontSize: 48, lineHeight: 1}}>✓</div>
                        Registration Successful!<br/>See you at the event.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventElement;
