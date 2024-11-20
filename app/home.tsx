import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Interface para o tópico detalhado
interface Topic {
  id: string;
  title: string;
  details: {
    name: string;
    time: string;
    cpf: string;
    type: string;
  };
}

// Dados com informações detalhadas
const topics: Topic[] = [
  {
    id: '1',
    title: 'Consulta Odontológica',
    details: {
      name: 'Carlos Silva',
      time: '14:00',
      cpf: '123.456.789-00',
      type: 'Avaliação inicial',
    },
  },
  {
    id: '2',
    title: 'Retorno Clínico',
    details: {
      name: 'Mariana Costa',
      time: '15:30',
      cpf: '987.654.321-00',
      type: 'Tratamento ortodôntico',
    },
  },
  {
    id: '3',
    title: 'Consulta de Urgência',
    details: {
      name: 'João Pereira',
      time: '16:00',
      cpf: '456.123.789-00',
      type: 'Dor de dente',
    },
  },
];

const HomeScreen: React.FC = () => {
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>(''); // Texto da pesquisa
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>(topics); // Lista filtrada
  const [showSearch, setShowSearch] = useState<boolean>(false); // Controle da barra de pesquisa

  const handleTopicPress = (id: string) => {
    if (expandedTopics.includes(id)) {
      setExpandedTopics(expandedTopics.filter(topicId => topicId !== id)); // Recolher
    } else {
      setExpandedTopics([...expandedTopics, id]); // Expandir
    }
  };

  const handleEdit = (id: string) => {
    Alert.alert('Editar', `Você deseja editar o tópico ${id}`);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Excluir',
      `Tem certeza de que deseja excluir o tópico ${id}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => Alert.alert('Excluído', `Tópico ${id} foi excluído.`) },
      ]
    );
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text === '') {
      setFilteredTopics(topics); // Exibe todos os itens se a barra de pesquisa estiver vazia
    } else {
      const filtered = topics.filter(topic =>
        topic.title.toLowerCase().includes(text.toLowerCase()) || // Pesquisa pelo título
        topic.details.name.toLowerCase().includes(text.toLowerCase()) // Pesquisa pelo nome do paciente
      );
      setFilteredTopics(filtered);
    }
  };

  const renderItem = ({ item }: { item: Topic }) => {
    const isExpanded = expandedTopics.includes(item.id);

    return (
      <TouchableOpacity
        style={[styles.topicContainer, isExpanded && styles.expandedContainer]}
        onPress={() => handleTopicPress(item.id)}
      >
        <Text style={styles.topicTitle}>{item.title}</Text>
        {isExpanded && (
          <View style={styles.expandedContent}>
            <Text style={styles.detailText}>👤 Nome: {item.details.name}</Text>
            <Text style={styles.detailText}>⏰ Horário: {item.details.time}</Text>
            <Text style={styles.detailText}>📄 CPF: {item.details.cpf}</Text>
            <Text style={styles.detailText}>🦷 Tipo: {item.details.type}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.actionButton, styles.editButton]}
                onPress={() => handleEdit(item.id)}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Barra de Tarefas */}
      <View style={styles.appBar}>
        {showSearch ? (
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar..."
            placeholderTextColor="#aaa"
            value={searchText}
            onChangeText={handleSearch}
          />
        ) : (
          <Text style={styles.appBarTitle}>OdontoLife</Text>
        )}
        <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Notificações')}>
          <Ionicons name="notifications" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>Consultas</Text>
      <FlatList
        data={filteredTopics}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum resultado encontrado</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  appBar: {
    width: '100%',
    height: 60,
    backgroundColor: '#203087',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  appBarTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginLeft: 10,
    color: '#000',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  topicContainer: {
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  expandedContainer: {
    backgroundColor: '#e6f7ff',
  },
  topicTitle: {
    fontSize: 18,
  },
  expandedContent: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#dc94fa',
    borderRadius: 5,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#007BFF',
  },
  deleteButton: {
    backgroundColor: '#FF4D4D',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },
});

export default HomeScreen;

















