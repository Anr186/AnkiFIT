import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState, useMemo, useRef } from 'react';

type RouteType = "/man/chest" | "/man/hands" | "../man/breakfast" | "../man/dinner";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

interface SearchItem {
  id: string;
  title: string;
  route: RouteType;
  category: 'training' | 'food';
}

const searchData: SearchItem[] = [
  {
    id: '1',
    title: 'Упражнения для груди',
    route: "/man/chest" as RouteType,
    category: 'training'
  },
  {
    id: '2',
    title: 'Упражнения для рук',
    route: "/man/hands" as RouteType,
    category: 'training'
  },
  {
    id: '3',
    title: 'Полезный завтрак',
    route: "../man/breakfast" as RouteType,
    category: 'food'
  },
  {
    id: '4',
    title: 'Крутой ужин',
    route: "../man/dinner" as RouteType,
    category: 'food'
  }
];

const botResponses = {
  greetings: [
    'Привет! Я Анки, твой персональный фитнес-тренер. Чем могу помочь?',
    'Здравствуйте! Готов помочь вам с тренировками. Что вас интересует?'
  ],
  training: [
    'Для начинающих я рекомендую начать с базовых упражнений. Например, приседания, отжимания и планка.',
    'Важно помнить про разминку перед каждой тренировкой!',
    'Для набора мышечной массы важно сочетать тренировки с правильным питанием.',
    'Рекомендую тренироваться 3-4 раза в неделю для оптимальных результатов.'
  ],
  diet: [
    'Не забывайте про белок - он важен для роста мышц!',
    'Пейте достаточно воды - минимум 2 литра в день.',
    'Старайтесь есть больше овощей и фруктов.',
    'Правильное питание - это 70% успеха в фитнесе.'
  ]
};

const Chatbot = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      text: 'Привет! Я Анки, твой персональный фитнес-тренер. Чем могу помочь?',
      isBot: true
    }
  ]);
  const scrollViewRef = useRef<ScrollView>(null);

  const getBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('привет') || lowerMessage.includes('здравствуй')) {
      return botResponses.greetings[Math.floor(Math.random() * botResponses.greetings.length)];
    } else if (
      lowerMessage.includes('тренировк') || 
      lowerMessage.includes('упражнен') ||
      lowerMessage.includes('занят')
    ) {
      return botResponses.training[Math.floor(Math.random() * botResponses.training.length)];
    } else if (
      lowerMessage.includes('питан') || 
      lowerMessage.includes('еда') || 
      lowerMessage.includes('диета')
    ) {
      return botResponses.diet[Math.floor(Math.random() * botResponses.diet.length)];
    }
    return 'Извините, я не совсем понял. Можете уточнить, что именно вас интересует по поводу тренировок или питания?';
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isBot: false
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(message),
        isBot: true
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return searchData.filter(item => 
      item.title.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const getCategoryColor = (category: 'training' | 'food') => {
    return category === 'training' ? 'bg-blue-500' : 'bg-green-500';
  };

  const getCategoryText = (category: 'training' | 'food') => {
    return category === 'training' ? 'Тренировка' : 'Питание';
  };

  const handleNavigation = (route: RouteType) => {
    router.push(route);
  };

  return (
    <SafeAreaView className="flex-1">
      {/* Header */}
      <View className="bg-blue-950 p-4">
        <Text className="text-white text-2xl font-bold text-left">
          Бот Anki
        </Text>
      </View>

      {/* Main Content */}
      <View className="flex-1 p-4">
        {/* Chat Messages */}
        <ScrollView 
          ref={scrollViewRef}
          className="flex-1 mb-4"
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg) => (
            <View 
              key={msg.id}
              className={`mb-2 ${msg.isBot ? 'items-start' : 'items-end'}`}
            >
              <View 
                className={`p-3 rounded-lg max-w-[80%] ${
                  msg.isBot ? 'bg-gray-200' : 'bg-blue-900'
                }`}
              >
                <Text className={msg.isBot ? 'text-black' : 'text-white'}>
                  {msg.text}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Search Results */}
        {searchQuery.trim() !== '' && (
          <ScrollView className="max-h-32 mb-4">
            {filteredItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleNavigation(item.route)}
                className={`mb-2 p-3 rounded-lg ${getCategoryColor(item.category)} shadow-sm`}
              >
                <Text className="text-white font-semibold">{item.title}</Text>
                <Text className="text-white opacity-80 text-sm">
                  {getCategoryText(item.category)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Bottom Input Section */}
        <View className="flex-row space-x-2">
          <TextInput
            className="flex-1 border border-gray-300 rounded-lg p-4 bg-white"
            placeholder="Напишите сообщение..."
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity 
            onPress={handleSendMessage}
            className="bg-blue-900 rounded-lg px-6 justify-center"
          >
            <Text className="text-white font-semibold">
              →
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="mt-2">
          <TextInput
            className="border border-gray-300 rounded-lg p-4 bg-white"
            placeholder="Поиск тренировок и питания..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chatbot;