import React, { useState } from 'react';
import { useAuth } from '../hooks/useApi';
import styles from './Css/PostCreation.module.css';
import { 
  FaPhotoVideo, 
  FaUserTag, 
  FaMapMarkerAlt, 
  FaSmile, 
  FaFile,
  FaTimes,
  FaGlobeAmericas,
  FaUserFriends,
  FaLock,
  FaChevronDown,
  FaImage,
  FaVideo,
  FaGift,
  FaCalendarAlt,
  FaSearch,
  FaHeart,
  FaLaugh,
  FaThumbsUp,
  FaSurprise,
  FaSadTear,
  FaAngry,
  FaPlay,
  FaMusic,
  FaUtensils,
  FaCoffee,
  FaGamepad,
  FaBook,
  FaCar,
  FaPlane,
  FaHome,
  FaBriefcase,
  FaGraduationCap
} from 'react-icons/fa';

interface PostCreationProps {
  onPostCreated?: (post: any) => void;
}

const PostCreation: React.FC<PostCreationProps> = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<'public' | 'connections' | 'private'>('public');
  const [feeling, setFeeling] = useState('');
  const [location, setLocation] = useState('');
  const [taggedPeople, setTaggedPeople] = useState<string[]>([]);
  const [showTagPeople, setShowTagPeople] = useState(false);
  const [showFeeling, setShowFeeling] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [selectedGif, setSelectedGif] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEvent, setShowEvent] = useState(false);
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });

  // Mock data for features
  const suggestedPeople = [
    { id: 1, name: 'John Doe', avatar: 'J' },
    { id: 2, name: 'Jane Smith', avatar: 'J' },
    { id: 3, name: 'Mike Johnson', avatar: 'M' },
    { id: 4, name: 'Sarah Wilson', avatar: 'S' },
    { id: 5, name: 'David Brown', avatar: 'D' }
  ];

  const feelings = [
    { icon: <FaHeart />, name: 'Loved', color: '#e31b23' },
    { icon: <FaLaugh />, name: 'Happy', color: '#ffd700' },
    { icon: <FaThumbsUp />, name: 'Good', color: '#1877f2' },
    { icon: <FaSurprise />, name: 'Surprised', color: '#ffa500' },
    { icon: <FaSadTear />, name: 'Sad', color: '#4169e1' },
    { icon: <FaAngry />, name: 'Angry', color: '#ff4500' }
  ];

  const activities = [
    { icon: <FaMusic />, name: 'Listening to music', color: '#1db954' },
    { icon: <FaUtensils />, name: 'Eating', color: '#ff6b35' },
    { icon: <FaCoffee />, name: 'Drinking coffee', color: '#8b4513' },
    { icon: <FaGamepad />, name: 'Playing games', color: '#ff69b4' },
    { icon: <FaBook />, name: 'Reading', color: '#2e8b57' },
    { icon: <FaCar />, name: 'Traveling', color: '#ffd700' },
    { icon: <FaPlane />, name: 'Flying', color: '#87ceeb' },
    { icon: <FaHome />, name: 'At home', color: '#32cd32' },
    { icon: <FaBriefcase />, name: 'Working', color: '#696969' },
    { icon: <FaGraduationCap />, name: 'Studying', color: '#4169e1' }
  ];

  const popularLocations = [
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Houston, TX',
    'Phoenix, AZ',
    'Philadelphia, PA',
    'San Antonio, TX',
    'San Diego, CA',
    'Dallas, TX',
    'San Jose, CA'
  ];

  const popularGifs = [
    'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
    'https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif',
    'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif',
    'https://media.giphy.com/media/3o7TKDEqP6VJzQv6rK/giphy.gif',
    'https://media.giphy.com/media/3o7TKUM3IgJBX2as9O/giphy.gif',
    'https://media.giphy.com/media/3o7TKDEqP6VJzQv6rK/giphy.gif'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() && selectedFiles.length === 0 && !selectedGif) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      const newPost = {
        id: Date.now().toString(),
        author: {
          name: user?.name || 'You',
          title: user?.title || 'Professional',
          avatar: user?.name?.charAt(0).toUpperCase() || 'U',
          time: 'Just now'
        },
        content: content.trim(),
        image: previewUrls[0] || undefined,
        gif: selectedGif || undefined,
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        visibility: visibility,
        feeling: feeling,
        location: location,
        taggedPeople: taggedPeople,
        event: eventData.title ? { ...eventData } : undefined,
      };
      
      // Call parent component callback
      if (onPostCreated) {
        onPostCreated(newPost);
      }
      
      // Reset form
      handleCloseModal();
      
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setContent('');
    setSelectedFiles([]);
    setPreviewUrls([]);
    setFeeling('');
    setLocation('');
    setTaggedPeople([]);
    setSelectedGif('');
    setShowTagPeople(false);
    setShowFeeling(false);
    setShowLocation(false);
    setShowGif(false);
    setSearchQuery('');
    setIsModalOpen(false);
    setEventData({ title: '', date: '', time: '', location: '', description: '' });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
    
    // Create preview URLs
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviewUrls(prev => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleTagPerson = (person: { id: number, name: string, avatar: string }) => {
    if (!taggedPeople.includes(person.name)) {
      setTaggedPeople(prev => [...prev, person.name]);
    }
    setShowTagPeople(false);
  };

  const removeTaggedPerson = (personName: string) => {
    setTaggedPeople(prev => prev.filter(name => name !== personName));
  };

  const handleSelectFeeling = (feelingItem: { icon: React.ReactNode, name: string, color: string }) => {
    setFeeling(feelingItem.name);
    setShowFeeling(false);
  };

  const handleSelectActivity = (activity: { icon: React.ReactNode, name: string, color: string }) => {
    setFeeling(activity.name);
    setShowFeeling(false);
  };

  const handleSelectLocation = (locationName: string) => {
    setLocation(locationName);
    setShowLocation(false);
  };

  const handleSelectGif = (gifUrl: string) => {
    setSelectedGif(gifUrl);
    setShowGif(false);
  };

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };
  const handleAddEvent = () => {
    setShowEvent(false);
  };
  const handleRemoveEvent = () => {
    setEventData({ title: '', date: '', time: '', location: '', description: '' });
  };

  const getVisibilityIcon = () => {
    switch (visibility) {
      case 'public':
        return <FaGlobeAmericas />;
      case 'connections':
        return <FaUserFriends />;
      case 'private':
        return <FaLock />;
      default:
        return <FaGlobeAmericas />;
    }
  };

  const getVisibilityText = () => {
    switch (visibility) {
      case 'public':
        return 'Public';
      case 'connections':
        return 'Connections';
      case 'private':
        return 'Only me';
      default:
        return 'Public';
    }
  };

  return (
    <>
      {/* Post Creation Trigger */}
      <div className={styles.postCreationContainer}>
        <div className={styles.postCreationCard}>
          <div className={styles.postCreationHeader}>
            <div className={styles.userAvatar}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div 
              className={styles.postInput}
              onClick={handleOpenModal}
            >
              <div className={styles.placeholder}>
                Share what's on your mind...
              </div>
            </div>
          </div>

          <div className={styles.postOptions}>
            <button className={styles.optionButton} onClick={handleOpenModal}>
              <FaPhotoVideo className={styles.optionIcon} />
              Photo/Video
            </button>
            <button className={styles.optionButton} onClick={handleOpenModal}>
              <FaUserTag className={styles.optionIcon} />
              Tag people
            </button>
            <button className={styles.optionButton} onClick={handleOpenModal}>
              <FaMapMarkerAlt className={styles.optionIcon} />
              Location
            </button>
            <button className={styles.optionButton} onClick={handleOpenModal}>
              <FaSmile className={styles.optionIcon} />
              Feeling/Activity
            </button>
          </div>
        </div>
      </div>

      {/* Facebook-Style Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Create post</h2>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.userSection}>
                <div className={styles.userAvatar}>
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className={styles.userInfo}>
                  <h3 className={styles.userName}>{user?.name || 'Your Name'}</h3>
                  <div className={styles.visibilitySelector}>
                    <button className={styles.visibilityButton}>
                      {getVisibilityIcon()}
                      <span>{getVisibilityText()}</span>
                      <FaChevronDown />
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.contentSection}>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={`What's on your mind, ${user?.name || 'there'}?`}
                  className={styles.contentTextarea}
                  rows={4}
                  autoFocus
                />

                {/* Tagged People Display */}
                {taggedPeople.length > 0 && (
                  <div className={styles.taggedPeopleDisplay}>
                    <span className={styles.taggedLabel}>Tagged:</span>
                    {taggedPeople.map((person, index) => (
                      <span key={index} className={styles.taggedPerson}>
                        {person}
                        <button 
                          className={styles.removeTagButton}
                          onClick={() => removeTaggedPerson(person)}
                        >
                          <FaTimes />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Feeling Display */}
                {feeling && (
                  <div className={styles.feelingDisplay}>
                    <FaSmile className={styles.feelingIcon} />
                    <span>Feeling {feeling}</span>
                  </div>
                )}

                {/* Location Display */}
                {location && (
                  <div className={styles.locationDisplay}>
                    <FaMapMarkerAlt className={styles.locationIcon} />
                    <span>At {location}</span>
                  </div>
                )}

                {/* GIF Display */}
                {selectedGif && (
                  <div className={styles.gifDisplay}>
                    <img src={selectedGif} alt="Selected GIF" className={styles.gifImage} />
                    <button 
                      className={styles.removeGifButton}
                      onClick={() => setSelectedGif('')}
                    >
                      <FaTimes />
                    </button>
                  </div>
                )}

                {/* File Previews */}
                {previewUrls.length > 0 && (
                  <div className={styles.previewContainer}>
                    {previewUrls.map((url, index) => (
                      <div key={index} className={styles.previewItem}>
                        <img src={url} alt={`Preview ${index}`} className={styles.previewImage} />
                        <button 
                          className={styles.removeButton}
                          onClick={() => removeFile(index)}
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Enhanced Options */}
                <div className={styles.enhancedOptions}>
                  <div className={styles.optionsHeader}>
                    <span>Add to your post</span>
                  </div>
                  <div className={styles.optionsGrid}>
                    <label className={styles.optionItem}>
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*,video/*" 
                        onChange={handleFileSelect}
                        className={styles.fileInput}
                      />
                      <FaImage className={styles.optionItemIcon} />
                      Photo/Video
                    </label>
                    <button 
                      className={styles.optionItem}
                      onClick={() => setShowTagPeople(!showTagPeople)}
                    >
                      <FaUserTag className={styles.optionItemIcon} />
                      Tag people
                    </button>
                    <button 
                      className={styles.optionItem}
                      onClick={() => setShowFeeling(!showFeeling)}
                    >
                      <FaSmile className={styles.optionItemIcon} />
                      Feeling/Activity
                    </button>
                    <button 
                      className={styles.optionItem}
                      onClick={() => setShowLocation(!showLocation)}
                    >
                      <FaMapMarkerAlt className={styles.optionItemIcon} />
                      Check in
                    </button>
                    <button 
                      className={styles.optionItem}
                      onClick={() => setShowGif(!showGif)}
                    >
                      <FaGift className={styles.optionItemIcon} />
                      GIF
                    </button>
                    <button className={styles.optionItem} onClick={() => setShowEvent(true)}>
                      <FaCalendarAlt className={styles.optionItemIcon} />
                      Event
                    </button>
                  </div>
                </div>

                {/* Tag People Popup */}
                {showTagPeople && (
                  <div className={styles.popupOverlay}>
                    <div className={styles.popupContent}>
                      <div className={styles.popupHeader}>
                        <h3>Tag people</h3>
                        <button onClick={() => setShowTagPeople(false)}>
                          <FaTimes />
                        </button>
                      </div>
                      <div className={styles.searchBox}>
                        <FaSearch className={styles.searchIcon} />
                        <input
                          type="text"
                          placeholder="Search people..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className={styles.searchInput}
                        />
                      </div>
                      <div className={styles.peopleList}>
                        {suggestedPeople
                          .filter(person => 
                            person.name.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map(person => (
                            <div 
                              key={person.id} 
                              className={styles.personItem}
                              onClick={() => handleTagPerson(person)}
                            >
                              <div className={styles.personAvatar}>{person.avatar}</div>
                              <span className={styles.personName}>{person.name}</span>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                )}

                {/* Feeling/Activity Popup */}
                {showFeeling && (
                  <div className={styles.popupOverlay}>
                    <div className={styles.popupContent}>
                      <div className={styles.popupHeader}>
                        <h3>How are you feeling?</h3>
                        <button onClick={() => setShowFeeling(false)}>
                          <FaTimes />
                        </button>
                      </div>
                      <div className={styles.feelingGrid}>
                        {feelings.map((feelingItem, index) => (
                          <button
                            key={index}
                            className={styles.feelingItem}
                            onClick={() => handleSelectFeeling(feelingItem)}
                            style={{ color: feelingItem.color }}
                          >
                            {feelingItem.icon}
                            <span>{feelingItem.name}</span>
                          </button>
                        ))}
                      </div>
                      <div className={styles.activitySection}>
                        <h4>Activities</h4>
                        <div className={styles.activityGrid}>
                          {activities.map((activity, index) => (
                            <button
                              key={index}
                              className={styles.activityItem}
                              onClick={() => handleSelectActivity(activity)}
                              style={{ color: activity.color }}
                            >
                              {activity.icon}
                              <span>{activity.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Location Popup */}
                {showLocation && (
                  <div className={styles.popupOverlay}>
                    <div className={styles.popupContent}>
                      <div className={styles.popupHeader}>
                        <h3>Check in</h3>
                        <button onClick={() => setShowLocation(false)}>
                          <FaTimes />
                        </button>
                      </div>
                      <div className={styles.searchBox}>
                        <FaSearch className={styles.searchIcon} />
                        <input
                          type="text"
                          placeholder="Search for a place..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className={styles.searchInput}
                        />
                      </div>
                      <div className={styles.locationList}>
                        {popularLocations
                          .filter(location => 
                            location.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((locationName, index) => (
                            <div 
                              key={index} 
                              className={styles.locationItem}
                              onClick={() => handleSelectLocation(locationName)}
                            >
                              <FaMapMarkerAlt className={styles.locationItemIcon} />
                              <span>{locationName}</span>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                )}

                {/* GIF Popup */}
                {showGif && (
                  <div className={styles.popupOverlay}>
                    <div className={styles.popupContent}>
                      <div className={styles.popupHeader}>
                        <h3>Choose a GIF</h3>
                        <button onClick={() => setShowGif(false)}>
                          <FaTimes />
                        </button>
                      </div>
                      <div className={styles.searchBox}>
                        <FaSearch className={styles.searchIcon} />
                        <input
                          type="text"
                          placeholder="Search GIFs..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className={styles.searchInput}
                        />
                      </div>
                      <div className={styles.gifGrid}>
                        {popularGifs.map((gifUrl, index) => (
                          <div 
                            key={index} 
                            className={styles.gifItem}
                            onClick={() => handleSelectGif(gifUrl)}
                          >
                            <img src={gifUrl} alt={`GIF ${index}`} className={styles.gifThumbnail} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Event Modal */}
                {showEvent && (
                  <div className={styles.popupOverlay}>
                    <div className={styles.popupContent}>
                      <div className={styles.popupHeader}>
                        <h3>Create Event</h3>
                        <button onClick={() => setShowEvent(false)}><FaTimes /></button>
                      </div>
                      <div className={styles.eventForm}>
                        <input
                          type="text"
                          name="title"
                          placeholder="Event Title"
                          value={eventData.title}
                          onChange={handleEventChange}
                          className={styles.eventInput}
                        />
                        <input
                          type="date"
                          name="date"
                          value={eventData.date}
                          onChange={handleEventChange}
                          className={styles.eventInput}
                        />
                        <input
                          type="time"
                          name="time"
                          value={eventData.time}
                          onChange={handleEventChange}
                          className={styles.eventInput}
                        />
                        <input
                          type="text"
                          name="location"
                          placeholder="Location"
                          value={eventData.location}
                          onChange={handleEventChange}
                          className={styles.eventInput}
                        />
                        <textarea
                          name="description"
                          placeholder="Description"
                          value={eventData.description}
                          onChange={handleEventChange}
                          className={styles.eventTextarea}
                        />
                        <div className={styles.eventActions}>
                          <button className={styles.eventAddButton} onClick={handleAddEvent} disabled={!eventData.title}>Add Event</button>
                          <button className={styles.eventRemoveButton} onClick={handleRemoveEvent}>Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button 
                className={`${styles.postButton} ${(content.trim() || selectedFiles.length > 0 || selectedGif) ? styles.active : ''}`}
                onClick={handleSubmit}
                disabled={(!content.trim() && selectedFiles.length === 0 && !selectedGif) || isLoading}
              >
                {isLoading ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostCreation;