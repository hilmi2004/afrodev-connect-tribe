import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTribe } from '@/hooks/useTribes';
import { useAuth } from '@/hooks/useAuth';
import { MainLayout } from '@/components/layout/MainLayout';
import { TribeChat } from '@/components/tribes/TribeChat';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Users, Calendar, FileText, Settings, ArrowLeft, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Tribe } from '@/types/tribe';

const TribeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('chat');
  const [isValidId, setIsValidId] = useState(false);

  const {
    tribe,
    loading,
    error,
    messages = [],
    events = [],
    resources = [],
    fetchTribe,
    fetchMessages,
    fetchEvents,
    fetchResources,
    sendMessage,
    joinTribe,
    leaveTribe,
    createEvent,
    addResource
  } = useTribe(id || '');

  // Validate tribe ID on mount
  useEffect(() => {
    if (!id || id === 'create') {
      toast.error('Invalid tribe URL');
      navigate('/tribes');
      return;
    }
    setIsValidId(true);
  }, [id, navigate]);

  // Fetch data when valid ID exists
  useEffect(() => {
    if (!isValidId) return;

    const loadData = async () => {
      try {
        await Promise.all([
          fetchTribe(),
          fetchMessages(),
          fetchEvents(),
          fetchResources()
        ]);
      } catch (error) {
        toast.error('Failed to load tribe data');
      }
    };

    loadData();
  }, [isValidId, fetchTribe, fetchMessages, fetchEvents, fetchResources]);

  const handleJoinTribe = async () => {
    try {
      await joinTribe();
      toast.success('Successfully joined the tribe!');
      await Promise.all([fetchTribe(), fetchMessages()]);
    } catch (error) {
      toast.error('Failed to join tribe');
    }
  };

  const handleLeaveTribe = async () => {
    try {
      await leaveTribe();
      toast.success("You've left the tribe");
      navigate('/tribes');
    } catch (error) {
      toast.error('Failed to leave tribe');
    }
  };

  const handleSendMessage = async (message: string) => {
    try {
      await sendMessage(message);
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const handleCreateEvent = async () => {
    try {
      const eventData = {
        title: 'New Event',
        date: new Date().toISOString(),
        location: 'Online',
        description: 'Event description'
      };
      await createEvent(eventData);
      toast.success('Event created successfully');
      await fetchEvents();
    } catch (error) {
      toast.error('Failed to create event');
    }
  };

  const handleAddResource = async () => {
    try {
      const formData = new FormData();
      formData.append('title', 'New Resource');
      formData.append('type', 'document');
      formData.append('description', 'Resource description');

      await addResource(formData);
      toast.success('Resource added successfully');
      await fetchResources();
    } catch (error) {
      toast.error('Failed to add resource');
    }
  };

  if (!isValidId) {
    return (
        <MainLayout>
          <div className="text-center py-12">
            <p className="text-red-500">Invalid tribe URL</p>
            <Button onClick={() => navigate('/tribes')}>Back to Tribes</Button>
          </div>
        </MainLayout>
    );
  }

  if (loading) {
    return (
        <MainLayout>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        </MainLayout>
    );
  }

  if (error) {
    return (
        <MainLayout>
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <Button onClick={() => {
              fetchTribe();
              fetchMessages();
              fetchEvents();
              fetchResources();
            }}>Retry</Button>
          </div>
        </MainLayout>
    );
  }

  if (!tribe) {
    return (
        <MainLayout>
          <div className="text-center py-12">
            <p>Tribe not found</p>
            <Button onClick={() => navigate('/tribes')}>Back to Tribes</Button>
          </div>
        </MainLayout>
    );
  }

  const isMember = tribe.members.some(member => member._id === user?._id);
  const isCreator = tribe.createdBy._id === user?._id;

  return (
      <MainLayout>
        <div className="container py-8 relative">
          {/* Header and tribe info */}
          <div className="mb-6">
            <Button variant="ghost" onClick={() => navigate('/tribes')} className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Tribes
            </Button>
          </div>

          {/* Tribe banner and info */}
          <div className="mb-8">
            <div className="h-48 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 relative overflow-hidden shadow-lg">
              <img
                  src={tribe.image || '/default-tribe-banner.jpg'}
                  alt="Tribe banner"
                  className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">{tribe.name}</h1>
                    <p className="text-white/80">{tribe.description}</p>
                  </div>
                  {!isMember ? (
                      <Button onClick={handleJoinTribe} className="bg-purple-600 hover:bg-purple-700">
                        Join Tribe
                      </Button>
                  ) : (
                      <Button
                          variant="outline"
                          onClick={handleLeaveTribe}
                          className="text-purple-600 border-purple-600 hover:bg-purple-50"
                      >
                        Leave Tribe
                      </Button>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {tribe.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                  ))}
                  <Badge variant="outline" className="text-xs">
                    {tribe.members.length} members
                  </Badge>
                  {tribe.country && (
                      <Badge variant="outline" className="text-xs">
                        {tribe.country}
                      </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tribe content tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="bg-white/50 backdrop-blur-sm border border-purple-500/10 p-1 shadow">
              <TabsTrigger value="chat" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                <MessageSquare size={16} className="mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="members" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                <Users size={16} className="mr-2" />
                Members
              </TabsTrigger>
              <TabsTrigger value="events" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                <Calendar size={16} className="mr-2" />
                Events
              </TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                <FileText size={16} className="mr-2" />
                Resources
              </TabsTrigger>
              {(isMember || isCreator) && (
                  <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                    <Settings size={16} className="mr-2" />
                    Settings
                  </TabsTrigger>
              )}
            </TabsList>

            {/* Chat tab */}
            <TabsContent value="chat" className="mt-6">
              {isMember ? (
                  <TribeChat
                      messages={messages}
                      sendMessage={handleSendMessage} tribeId={''}                  />
              ) : (
                  <div className="text-center p-12">
                    <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-gray-500 mb-4">Join the tribe to participate in the chat</p>
                    <Button onClick={handleJoinTribe} className="bg-purple-600">
                      Join Tribe
                    </Button>
                  </div>
              )}
            </TabsContent>




            <TabsContent value="members">
              <div className="bg-white rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Tribe Members</h3>
                  <div className="text-sm text-gray-500">
                    {tribe.members.length} members
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tribe.members.map(member => (
                      <div key={member._id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <Avatar>
                          <AvatarImage src={member.profileImage || '/default-avatar.png'} alt={member.fullName} />
                          <AvatarFallback>
                            {member.fullName.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{member.fullName}</h4>
                          <p className="text-sm text-gray-500 truncate">
                            {member.country || 'No location specified'}
                          </p>
                        </div>
                        {member._id === tribe.createdBy?._id && (
                            <Badge variant="outline" className="text-xs">
                              Creator
                            </Badge>
                        )}
                      </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="events">
              <div className="bg-white rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Upcoming Events</h3>
                  {isMember && (
                      <Button
                          size="sm"
                          onClick={handleCreateEvent}
                          className="flex items-center gap-2"
                      >
                        <PlusCircle size={16} />
                        Create Event
                      </Button>
                  )}
                </div>
                {events.length > 0 ? (
                    <div className="space-y-4">
                      {events.map(event => (
                          <div key={event._id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                            <h4 className="font-medium">{event.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                              <Calendar size={14} />
                              <span>
                          {format(new Date(event.date), 'MMM dd, yyyy')} • {event.location}
                        </span>
                            </div>
                            {event.description && (
                                <p className="text-sm mt-2">{event.description}</p>
                            )}
                          </div>
                      ))}
                    </div>
                ) : (
                    <div className="text-center p-12 text-gray-500">
                      <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                      <p>No upcoming events scheduled</p>
                      {isMember && (
                          <Button
                              onClick={handleCreateEvent}
                              className="mt-4"
                          >
                            Create First Event
                          </Button>
                      )}
                    </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="resources">
              <div className="bg-white rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Tribe Resources</h3>
                  {isMember && (
                      <Button
                          size="sm"
                          onClick={handleAddResource}
                          className="flex items-center gap-2"
                      >
                        <PlusCircle size={16} />
                        Add Resource
                      </Button>
                  )}
                </div>
                {resources.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {resources.map(resource => (
                          <div key={resource._id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                            <div className="flex items-start gap-3">
                              <div className="bg-gray-100 p-3 rounded-lg">
                                <FileText size={20} className="text-gray-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">{resource.title}</h4>
                                <p className="text-sm text-gray-500 mt-1 capitalize">
                                  {resource.type}
                                </p>
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
                ) : (
                    <div className="text-center p-12 text-gray-500">
                      <FileText size={48} className="mx-auto mb-4 opacity-50" />
                      <p>No resources added yet</p>
                      {isMember && (
                          <Button
                              onClick={handleAddResource}
                              className="mt-4"
                          >
                            Add First Resource
                          </Button>
                      )}
                    </div>
                )}
              </div>
            </TabsContent>

            {(isMember || isCreator) && (
                <TabsContent value="settings">
                  <div className="bg-white rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-6">Tribe Settings</h3>
                    {isCreator ? (
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-medium mb-2">Tribe Management</h4>
                            <div className="space-y-3">
                              <Button variant="outline" className="w-full justify-start">
                                Edit Tribe Information
                              </Button>
                              <Button variant="outline" className="w-full justify-start">
                                Manage Members
                              </Button>
                              <Button variant="destructive" className="w-full justify-start">
                                Delete Tribe
                              </Button>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Danger Zone</h4>
                            <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                              <p className="text-sm text-red-800">
                                Deleting the tribe will permanently remove all its data including chats, events, and resources.
                              </p>
                              <Button variant="destructive" className="mt-3">
                                Delete Tribe
                              </Button>
                            </div>
                          </div>
                        </div>
                    ) : (
                        <div>
                          <p className="text-gray-500">
                            Only tribe creators can manage these settings.
                          </p>
                        </div>
                    )}
                  </div>
                </TabsContent>
            )}
          </Tabs>
        </div>
      </MainLayout>
  );
};

export default TribeDetail;