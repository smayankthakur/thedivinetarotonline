'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

interface AuthActions {
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>
  signInWithGoogle: () => Promise<{ error: Error | null }>
  signInWithGitHub: () => Promise<{ error: Error | null }>
  signOut: () => Promise<{ error: Error | null }>
  resetPassword: (email: string) => Promise<{ error: Error | null }>
  updatePassword: (newPassword: string) => Promise<{ error: Error | null }>
  clearError: () => void
}

export function useAuth(): AuthState & AuthActions {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const handleError = useCallback((error: Error | unknown): string => {
    if (error instanceof Error) {
      // Map Supabase errors to user-friendly messages
      const message = error.message
    
    if (message.includes('Invalid login credentials')) {
      return 'Invalid email or password. Please try again.'
    }
    if (message.includes('Email not confirmed')) {
      return 'Please verify your email before logging in.'
    }
    if (message.includes('User already registered')) {
      return 'An account with this email already exists.'
    }
    if (message.includes('Password should be at least 6 characters')) {
      return 'Password must be at least 6 characters long.'
    }
    if (message.includes('Unable to validate email address')) {
      return 'Please enter a valid email address.'
    }
    if (message.includes('signup is disabled')) {
      return 'New registrations are currently disabled.'
    }
    
      return message
    }
    return 'An unexpected error occurred. Please try again.'
  }, [])

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user: supabaseUser },
          error: getUserError,
        } = await supabase.auth.getUser()

        if (getUserError) {
          console.error('Error getting user:', getUserError)
          setUser(null)
        } else if (supabaseUser) {
          setUser({
            id: supabaseUser.id,
            email: supabaseUser.email || '',
            name: supabaseUser.user_metadata?.name || supabaseUser.user_metadata?.full_name || '',
            avatar: supabaseUser.user_metadata?.avatar_url || supabaseUser.user_metadata?.picture,
            createdAt: supabaseUser.created_at,
            updatedAt: supabaseUser.updated_at || supabaseUser.created_at,
          })
        } else {
          setUser(null)
        }
      } catch (err) {
        console.error('Error in getUser:', err)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || session.user.user_metadata?.full_name || '',
          avatar: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture,
          createdAt: session.user.created_at,
          updatedAt: session.user.updated_at || session.user.created_at,
        })
        setError(null)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setError(null)
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || session.user.user_metadata?.full_name || '',
          avatar: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture,
          createdAt: session.user.created_at,
          updatedAt: session.user.updated_at || session.user.created_at,
        })
      } else if (event === 'USER_UPDATED' && session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || session.user.user_metadata?.full_name || '',
          avatar: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture,
          createdAt: session.user.created_at,
          updatedAt: session.user.updated_at || session.user.created_at,
        })
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null)
    setLoading(true)
    
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      })

      if (signInError) {
        const errorMessage = handleError(signInError)
        setError(errorMessage)
        return { error: new Error(errorMessage) }
      }

      return { error: null }
    } catch (err) {
      const errorMessage = handleError(err)
      setError(errorMessage)
      return { error: new Error(errorMessage) }
    } finally {
      setLoading(false)
    }
  }, [supabase, handleError])

  const signUp = useCallback(async (email: string, password: string, name: string) => {
    setError(null)
    setLoading(true)

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            name: name.trim(),
            full_name: name.trim(),
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (signUpError) {
        const errorMessage = handleError(signUpError)
        setError(errorMessage)
        return { error: new Error(errorMessage) }
      }

      return { error: null }
    } catch (err) {
      const errorMessage = handleError(err)
      setError(errorMessage)
      return { error: new Error(errorMessage) }
    } finally {
      setLoading(false)
    }
  }, [supabase, handleError])

  const signInWithGoogle = useCallback(async () => {
    setError(null)
    setLoading(true)

    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (oauthError) {
        const errorMessage = handleError(oauthError)
        setError(errorMessage)
        return { error: new Error(errorMessage) }
      }

      return { error: null }
    } catch (err) {
      const errorMessage = handleError(err)
      setError(errorMessage)
      return { error: new Error(errorMessage) }
    } finally {
      setLoading(false)
    }
  }, [supabase, handleError])

  const signInWithGitHub = useCallback(async () => {
    setError(null)
    setLoading(true)

    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (oauthError) {
        const errorMessage = handleError(oauthError)
        setError(errorMessage)
        return { error: new Error(errorMessage) }
      }

      return { error: null }
    } catch (err) {
      const errorMessage = handleError(err)
      setError(errorMessage)
      return { error: new Error(errorMessage) }
    } finally {
      setLoading(false)
    }
  }, [supabase, handleError])

  const signOut = useCallback(async () => {
    setError(null)
    setLoading(true)

    try {
      const { error: signOutError } = await supabase.auth.signOut()

      if (signOutError) {
        const errorMessage = handleError(signOutError)
        setError(errorMessage)
        return { error: new Error(errorMessage) }
      }

      setUser(null)
      return { error: null }
    } catch (err) {
      const errorMessage = handleError(err)
      setError(errorMessage)
      return { error: new Error(errorMessage) }
    } finally {
      setLoading(false)
    }
  }, [supabase, handleError])

  const resetPassword = useCallback(async (email: string) => {
    setError(null)
    setLoading(true)

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.trim().toLowerCase(),
        {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        }
      )

      if (resetError) {
        const errorMessage = handleError(resetError)
        setError(errorMessage)
        return { error: new Error(errorMessage) }
      }

      return { error: null }
    } catch (err) {
      const errorMessage = handleError(err)
      setError(errorMessage)
      return { error: new Error(errorMessage) }
    } finally {
      setLoading(false)
    }
  }, [supabase, handleError])

  const updatePassword = useCallback(async (newPassword: string) => {
    setError(null)
    setLoading(true)

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (updateError) {
        const errorMessage = handleError(updateError)
        setError(errorMessage)
        return { error: new Error(errorMessage) }
      }

      return { error: null }
    } catch (err) {
      const errorMessage = handleError(err)
      setError(errorMessage)
      return { error: new Error(errorMessage) }
    } finally {
      setLoading(false)
    }
  }, [supabase, handleError])

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithGitHub,
    signOut,
    resetPassword,
    updatePassword,
    clearError,
  }
}
