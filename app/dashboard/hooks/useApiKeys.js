"use client";

import { useState, useEffect } from "react";
import { apiKeyService } from '@/app/services/apiKeyService';

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [revealedKeys, setRevealedKeys] = useState({});
  const [copiedKey, setCopiedKey] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [editingKeyName, setEditingKeyName] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingKey, setDeletingKey] = useState(null);
  const [isCreatingKey, setIsCreatingKey] = useState(false);
  const [isUpdatingKey, setIsUpdatingKey] = useState(false);
  const [isDeletingKey, setIsDeletingKey] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const data = await apiKeyService.fetchApiKeys();
        setApiKeys(data);
      } catch (error) {
        // Handle error - could add error state here
        console.error('Failed to fetch API keys:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiKeys();
  }, []);

  const handleCreateKey = async (e) => {
    e.preventDefault();
    if (newKeyName) {
      setIsCreatingKey(true);
      try {
        const newKey = await apiKeyService.createApiKey(newKeyName);
        setApiKeys([...apiKeys, newKey]);
        setRevealedKeys(prev => ({ ...prev, [newKey.api_key]: true }));
        closeModal();
      } catch (error) {
        // Handle error - could add error state here
        console.error('Failed to create API key:', error);
      } finally {
        setIsCreatingKey(false);
      }
    }
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setNewKeyName("");
  };

  const toggleKeyVisibility = (key) => {
    setRevealedKeys(prev => ({
        ...prev,
        [key]: !prev[key]
    }));
  };

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => {
        setCopiedKey(null);
    }, 2000);
  };

  const openEditModal = (keyToEdit) => {
    setEditingKey(keyToEdit);
    setEditingKeyName(keyToEdit.name);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingKey(null);
    setEditingKeyName("");
  };

  const handleUpdateKeyName = async (e) => {
    e.preventDefault();
    if (editingKey && editingKeyName) {
      setIsUpdatingKey(true);
      try {
        const updatedKey = await apiKeyService.updateApiKey(editingKey.id, editingKeyName);
        setApiKeys(apiKeys.map(k => (k.id === editingKey.id ? updatedKey : k)));
        closeEditModal();
      } catch (error) {
        // Handle error - could add error state here
        console.error('Failed to update API key:', error);
      } finally {
        setIsUpdatingKey(false);
      }
    }
  };

  const openDeleteModal = (key) => {
    setDeletingKey(key);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingKey(null);
  };

  const handleRevokeKey = async () => {
    if (deletingKey) {
      setIsDeletingKey(true);
      try {
        await apiKeyService.deleteApiKey(deletingKey.id);
        setApiKeys(apiKeys.filter((apiKey) => apiKey.id !== deletingKey.id));
        closeDeleteModal();
      } catch (error) {
        // Handle error - could add error state here
        console.error('Failed to delete API key:', error);
      } finally {
        setIsDeletingKey(false);
      }
    }
  };

  return {
    apiKeys,
    isModalOpen,
    newKeyName,
    setNewKeyName,
    revealedKeys,
    copiedKey,
    isEditModalOpen,
    editingKey,
    editingKeyName,
    setEditingKeyName,
    isDeleteModalOpen,
    deletingKey,
    isCreatingKey,
    isUpdatingKey,
    isDeletingKey,
    isLoading,
    handleCreateKey,
    openModal,
    closeModal,
    toggleKeyVisibility,
    handleCopyKey,
    openEditModal,
    closeEditModal,
    handleUpdateKeyName,
    openDeleteModal,
    closeDeleteModal,
    handleRevokeKey
  };
} 